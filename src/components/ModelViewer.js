import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';
import initScene from '../three/initScene';
import initCameraControls from '../three/cameraControl';
import UIManager from '../UI/uiManager';
import LoadManager from '../load/loadManager';
function ModelViewer() {
    const mountRef = useRef(null);


    useEffect(() => {
        const { scene, camera, renderer } = initScene();
        const mount = mountRef.current;
        mount.appendChild(renderer.domElement);
        /*
                //创建材质列表和模型列表
                const materials = createMaterials();
                const simpleMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // 使用纯红色材质测试
                simpleMaterial.side = THREE.FrontSide
                const OBJmodels = [
                    { path: '/sceneModels/roadForVehicles.obj', material: materials.roadForVehicles },
                    { path: '/sceneModels/roadForPeople.obj', material: materials.roadForPeople },
                    { path: '/sceneModels/grass.obj', material: materials.grass },
                    //{ path: '/sceneModels/building.obj', material: simpleMaterial },
                    { path: '/sceneModels/barrier.obj', material: materials.barrier },
                    { path: '/sceneModels/roadSide.obj', material: materials.roadSide },
                    { path: '/sceneModels/stairs.obj', material: materials.stairs },
                    { path: '/sceneModels/tree.obj', material: materials.grass }
        
                ];
        
        
                //导入OBJ模型
                const loadModels = async (model, index) => {
                    try {
                        const mesh = await loadOBJ(model.path, [0, 0, 0], [0, 0, 0], scene, model.material);
                        console.log('obj Model loaded:', mesh);
                        // Load next model if exists
                        if (index + 1 < OBJmodels.length) {
                            loadModels(OBJmodels[index + 1], index + 1);
                        }
                    } catch (error) {
                        console.error('Error loading obj file:', error);
                    }
                };
        
                // Start loading the first model
                if (OBJmodels.length > 0) {
                    loadModels(OBJmodels[0], 0);
                }
        
                //导入gltf模型
                const gltfModels = [
                    {
                        url: '/sceneModels/gltfTree/mytree.gltf',
                        positions: [new THREE.Vector3(0, 0, 0), new THREE.Vector3(-5.1, 0, 7.46), new THREE.Vector3(10, 0, 0)],
                        rotation: new THREE.Euler(0, Math.PI / 2, 0),
                        count: 3
                    },
                    // 更多模型可以添加到这个数组
                ];
                // 加载模型
                loadGltf(gltfModels, scene)
                    .then(instances => {
                        console.log('Models loaded', instances);
                    })
                    .catch(error => {
                        console.error('Error loading GLTF models:', error);
                    });
        */
        //创建模型导入管理器并导入模型
        const loadManager = new LoadManager(scene);
        loadManager.loadModels().then(() => {
            console.log('All models loaded successfully');
        }).catch(error => {
            console.error('Failed to load models:', error);
        });

        //创建UI管理器
        const uiManager = new UIManager(scene, camera, renderer); // 创建UI管理器
        uiManager.initListeners(); // 初始化UI事件监听器


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
    }, []);

    return <div className="ModelViewer" ref={mountRef}></div>;
}

export default ModelViewer;
