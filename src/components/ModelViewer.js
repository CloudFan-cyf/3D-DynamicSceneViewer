import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';
import initScene from '../three/initScene';
import initCameraControls from '../three/cameraControl';
import UIManager from '../UI/uiManager';
import LoadManager from '../load/loadManager';
import createMaterials from '../three/createMaterials'; // 确保这里正确导入
async function createLoadManager(scene) {
    const materials = await createMaterials();
    return new LoadManager(scene, materials);
}
function ModelViewer() {
    const mountRef = useRef(null);

    useEffect(() => {
        async function initialize() {
            const { scene, camera, renderer } = initScene();
            const mount = mountRef.current;
            mount.appendChild(renderer.domElement);

            // 异步初始化材质和加载管理器
            // 使用工厂函数创建 LoadManager 实例
            const loadManager = await createLoadManager(scene);
            // loadManager 现在已经包含了初始化的材质
            try {
                await loadManager.loadModels();
                await loadManager.implementedLoadOSM();
                await loadManager.implementedLoadSkyBox();
                console.log('All models loaded successfully');
            } catch (error) {
                console.error('Failed to load models:', error);
            }


            const uiManager = new UIManager(scene, camera, renderer);
            uiManager.initListeners();

            const onWindowResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            window.addEventListener('resize', onWindowResize);
            const controls = initCameraControls(camera, renderer);

            const animate = () => {
                requestAnimationFrame(animate);
                controls.update();
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
