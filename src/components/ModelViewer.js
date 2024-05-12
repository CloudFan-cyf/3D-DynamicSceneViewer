import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';
import initScene from '../three/initScene';
import initCameraControls from '../three/cameraControl';
import UIManager from '../UI/uiManager';
import staticLoadManager from '../load/staticLoadManager';
import createMaterials from '../three/createMaterials'; // 确保这里正确导入
import DynamicManager from '../dynamic/dynamicManager';
import timeManager from './timeManager';
async function createStaticLoadManager(scene) {
    const materials = await createMaterials();
    return new staticLoadManager(scene, materials);
}


function ModelViewer() {
    const mountRef = useRef(null);

    useEffect(() => {
        async function initialize() {
            const { scene, camera, renderer } = initScene();
            const mount = mountRef.current;
            mount.appendChild(renderer.domElement);

            // 异步初始化材质和静态物体加载管理器
            // 使用工厂函数创建 staticLoadManager 实例
            const staticLoadManager = await createStaticLoadManager(scene);
            // staticLoadManager 现在已经包含了初始化的材质
            try {
                await staticLoadManager.loadModels();
                await staticLoadManager.implementedLoadOSM();
                await staticLoadManager.implementedLoadSkyBox();
                console.log('All models loaded successfully');
            } catch (error) {
                console.error('Failed to load models:', error);
            }

            //加载动态物体
            const dynamicManager = new DynamicManager(scene, staticLoadManager);
            


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
                dynamicManager.updateScene(deltaTime);
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

    return <div className="ModelViewer" ref={mountRef}></div>;
}

export default ModelViewer;
