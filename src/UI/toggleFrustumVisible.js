import React, { useState } from 'react';
import { Button } from '@mui/material';

function ToggleVisibilityButton({ frustumMesh, edgesMesh }) {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        const visible = !isVisible;
        setIsVisible(visible);
        frustumMesh.visible = visible;
        if (edgesMesh) edgesMesh.visible = visible; // 如果存在轮廓线，则也控制其可见性
    };

    return (
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
            {isVisible ? '隐藏视锥' : '显示视锥'}
        </Button>
    );
}

export default ToggleVisibilityButton;
