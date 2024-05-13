import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Draggable from 'react-draggable';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedIcon from '@mui/icons-material/Speed';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import DynamicManager from '../dynamic/dynamicManager';

function InfoPanel() {
    const [tabValue, setTabValue] = useState(0);
    const [dynamicObjects, setDynamicObjects] = useState([]);
    const [frame, setFrame] = useState(0);


    useEffect(() => {
        let isActive = true; // 添加标志以避免在组件卸载后更新状态

        // 获取 DynamicManager 的实例并订阅
        DynamicManager.getInstance().then(manager => {
            if (isActive) {
                manager.subscribe(setDynamicObjects);
                manager.comfirm();

                // 清理函数
                return () => {
                    manager.unsubscribe(setDynamicObjects);
                };
            }
        });

        const updateFrame = () => {
            setFrame(prev => prev + 1); // 在动画帧中更新状态以强制重新渲染
            requestAnimationFrame(updateFrame);
        };

        requestAnimationFrame(updateFrame); // 启动循环

        return () => {
            isActive = false; // 组件卸载时更新标志
        };
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const categories = ['All', 'Human', 'Vehicles'];

    return (
        <Draggable>
            <Card sx={{ width: 300, position: 'absolute', left: 20, top: 20, maxHeight: '90vh', overflow: 'auto' }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        Dynamic Object Info
                    </Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Info categories">
                            {categories.map((category, index) => (
                                <Tab label={category} key={index} />
                            ))}
                        </Tabs>
                    </Box>
                    <Box sx={{ pt: 2 }}>
                        {dynamicObjects.filter(item => item.modelType === categories[tabValue] || categories[tabValue] === 'All').map((item, index) => (
                            <Accordion key={index}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="subtitle1">{item.instanceName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="body2"><SpeedIcon /> Speed: {Number(item.speed).toFixed(2)} m/s</Typography>
                                        <Typography variant="body2"><LocationOnIcon />Position: {Number(item.currentPosition.x).toFixed(3)}, {Number(item.currentPosition.z).toFixed(3)}</Typography>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Draggable>
    );
}

export default InfoPanel;
