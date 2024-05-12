// AnimationControl.js
import React from 'react';

function AnimationPlayControl({ toggleAnimations, areAnimationsPlaying, onResetAnimations }) {
    return (
        <div>
            <button
                onClick={toggleAnimations}
                style={{
                    position: 'absolute',  // 使按钮固定在视口中的特定位置
                    top: '10px',           // 距离顶部10px
                    left: '100px',          // 距离左边10px
                    padding: '10px',       // 内填充
                    zIndex: 1000,          // 确保按钮不会被其他画面元素遮挡
                }}
            >
                {areAnimationsPlaying ? 'Pause' : 'Play'}
            </button>
            <button
                onClick={onResetAnimations}
                style={{
                    position: 'absolute',  // 使按钮固定在视口中的特定位置
                    top: '10px',           // 距离顶部10px
                    left: '200px',          // 距离左边10px
                    padding: '10px',       // 内填充
                    zIndex: 1000,          // 确保按钮不会被其他画面元素遮挡
                }}
            >
                Restart
            </button>
        </div>
    );
}

export default AnimationPlayControl;
