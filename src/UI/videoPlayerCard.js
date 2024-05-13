import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import Draggable from 'react-draggable';
function VideoPlayerCard({isPlaying, onRestart}) {
    const video1Ref = useRef(null);
    const video2Ref = useRef(null);
    // Local state to manage play/pause due to browser restrictions


    useEffect(() => {
        if (isPlaying === true) {
           //console.log('Video Playing,isPlaying = ',isPlaying  );
            video1Ref.current.play();
            video2Ref.current.play();
        } else {
            //console.log('Video Paused,isPlaying = ',isPlaying );
            video1Ref.current.pause();
            video2Ref.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        if (onRestart) { // Assuming the restart button sets isPlaying to false
            //console.log('Video Restarting,onRestart = ',onRestart );
            video1Ref.current.currentTime = 0;
            video2Ref.current.currentTime = 0;
            video1Ref.current.pause();
            video2Ref.current.pause();
        }
    }, [onRestart]);

    return (
        <Draggable>
            <Card sx={{ maxWidth: 400, position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Real-World Videos
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Video 1: CCTV View
                            </Typography>
                            <video width="100%" ref={video1Ref} muted={true} controls>
                                <source src="/video/CCTV.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Video 2: First Person View
                            </Typography>
                            <video width="100%" ref={video2Ref} muted={true} controls>
                                <source src="/video/FPV.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Draggable>
    );
}

export default VideoPlayerCard;
