import React from 'react';

function AnimationControl({ toggleAnimations, areAnimationsPlaying }) {
    return (
        <button onClick={toggleAnimations}>
            {areAnimationsPlaying ? 'Stop Animations' : 'Play Animations'}
        </button>
    );
}

export default AnimationControl;
