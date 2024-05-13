import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import Draggable from 'react-draggable';
import ClickPositionDisplay from './clickPositionDisplay';
import convertSceneCoordinatesToLatLong from '../osm/convertSceneCoordinatesToLatLong';

function CoordinatesCard() {
    const [coordinates, setCoordinates] = useState({ scene: null, world: null });

    const updateCoordinates = (sceneCoords) => {
        const worldCoords = convertSceneCoordinatesToLatLong(sceneCoords.x, sceneCoords.z);
        setCoordinates({
            scene: sceneCoords,
            world: worldCoords
        });
    };

    useEffect(() => {
        let isActive = true; // To prevent updates after the component is unmounted

        ClickPositionDisplay.getInstance().then((instance) => {
            if (isActive) {
                instance.subscribe(updateCoordinates);
            }
            return () => {
                instance.unsubscribe(updateCoordinates);
            };
        });

        return () => {
            isActive = false; // Set flag to false on component unmount
        };
    }, []);

    return (
        <Draggable>
            <Card sx={{ position: 'fixed', bottom: 20, left: 20, width: 300, zIndex: 1000 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        <PlaceIcon /> Coordinates
                    </Typography>
                    <Box>
                        <Typography variant="body1">
                            Scene: {coordinates.scene ? `x: ${Number(coordinates.scene.x).toFixed(3)}, y: ${Number(coordinates.scene.y).toFixed(3)}, z: ${Number(coordinates.scene.z).toFixed(3)}` : 'Click in the scene'}
                        </Typography>
                        <Typography variant="body1">
                            World: {coordinates.world ? `Latitude: ${Number(coordinates.world.latitude).toFixed(6)}, Longitude: ${Number(coordinates.world.longitude).toFixed(6)}` : 'Click in the scene'}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Draggable>
    );
}

export default CoordinatesCard;
