import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';
import initScene from '../three/initScene';
import initCameraControls from '../three/cameraControl';

import UIManager from '../UI/uiManager';
import AnimationPlayControl from '../UI/animationPlayCtrl';

import staticLoadManager from '../load/staticLoadManager';
import createMaterials from '../three/createMaterials';

import DynamicManager from '../dynamic/dynamicManager';
import timeManager from './timeManager';


async function createStaticLoadManager(scene) {
    const materials = await createMaterials();
    return new staticLoadManager(scene, materials);
}


function ModelViewer() {
    const mountRef = useRef(null);
    const [areAnimationsPlaying, setAreAnimationsPlaying] = useState(false);
    const [isRestart, setIsRestart] = useState(false);
    const [dynamicManager, setDynamicManager] = useState(null); // 保存动态管理器的引用
    const playingRef = useRef(areAnimationsPlaying); // 新增引用，同步动画播放状态
    const isRestartRef = useRef(isRestart); // 新增引用，同步重置状态
    useEffect(() => {
        playingRef.current = areAnimationsPlaying; // 每次 areAnimationsPlaying 更新时，同步到引用中
        isRestartRef.current = isRestart; // 每次 isRestart 更新时，同步到引用中

    }, [areAnimationsPlaying, isRestart]);



    useEffect(() => {

        async function initialize() {
            const { scene, camera, renderer } = initScene();
            const mount = mountRef.current;
            mount.appendChild(renderer.domElement);

            // 异步初始化材质和静态物体加载管理器
            // 使用工厂函数创建 staticLoadManager 实例
            const sLoadManager = await createStaticLoadManager(scene);
            // staticLoadManager 现在已经包含了初始化的材质
            try {
                await sLoadManager.loadModels();
                await sLoadManager.implementedLoadOSM();
                await sLoadManager.implementedLoadSkyBox();
                console.log('All models loaded successfully');
            } catch (error) {
                console.error('Failed to load models:', error);
            }

            //加载动态物体
            const dManager = new DynamicManager(scene);
            setDynamicManager(dManager); // 设置动态管理器的引用

            const uiManager = new UIManager(scene, camera, renderer);
            uiManager.initListeners();

            const onWindowResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', onWindowResize);
            const controls = initCameraControls(camera, renderer);


            const animate = (time) => {
                requestAnimationFrame(animate);

                const deltaTime = timeManager.update(time);

                controls.update();
                if (playingRef.current) {
                    console.log('update animations');
                    dManager.updateScene(deltaTime); // 只有当areAnimationsPlaying为true时才更新动画
                }
                else if (isRestartRef.current) {
                    dManager.resetAnimations(); // 只有当isRestart为true时才重置动画
                    dManager.updateScene(deltaTime); // 只有当isRestart为true时才重置动画
                    console.log('reset animations');
                    setIsRestart(false); // 重置动画重启状态，此时可以接收下一次重置。
                }
                renderer.render(scene, camera);
            };
            animate();

            

            return () => {
                mount.removeChild(renderer.domElement);
                window.removeEventListener('resize', onWindowResize);
            };
        }

        initialize();
    }, []);

    const handlePlayPauseClick = () => {
        setAreAnimationsPlaying(prevState => !prevState);
        if(isRestart){
            setIsRestart(false); // 重置动画状态，准备重启动画
        }
    };
    const handleResetClick = () => {
        if (dynamicManager) {
            dynamicManager.resetAnimations();  // 调用动态管理器的重置函数
            setAreAnimationsPlaying(false); 
            setIsRestart(true); // 重置动画状态，准备重启动画
        } else {
            console.error("Dynamic manager is not initialized when trying to reset animations.");
        }
    };

    return (
        <div className="ModelViewer" ref={mountRef}>
            {dynamicManager && (
                <AnimationPlayControl
                    toggleAnimations={handlePlayPauseClick}
                    areAnimationsPlaying={areAnimationsPlaying}
                    onResetAnimations={handleResetClick}
                />
            )}
        </div>
    );
}

export default ModelViewer;
