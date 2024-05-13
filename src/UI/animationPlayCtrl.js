// AnimationControl.js
import React from 'react';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';


function AnimationPlayControl({ toggleAnimations, areAnimationsPlaying, onResetAnimations }) {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                startIcon={areAnimationsPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                onClick={toggleAnimations}
            >
                {areAnimationsPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<ReplayIcon />}
                onClick={onResetAnimations}
                sx={{ ml: 2 }} // 添加左边距
            >
                Reset
            </Button>
        </div>
    );
}

export default AnimationPlayControl;
