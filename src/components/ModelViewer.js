/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';
import initScene from '../three/initScene';
import initCameraControls from '../three/cameraControl';

import ClickPositionDisplay from '../UI/clickPositionDisplay';

import AnimationPlayControl from '../UI/animationPlayCtrl';
import InfoPanel from '../UI/infoPanel';
import VideoPlayerCard from '../UI/videoPlayerCard';
import CameraSwitcher from '../UI/cameraSwitcher';
import CoordinatesCard from '../UI/coordinatesCard';
import Box from '@mui/material/Box';


import staticLoadManager from '../load/staticLoadManager';
import createMaterials from '../three/createMaterials';

import DynamicManager from '../dynamic/dynamicManager';
import timeManager from './timeManager';
import { PLYExporter } from 'three-stdlib';



async function createStaticLoadManager(scene) {
    const materials = await createMaterials();
    return new staticLoadManager(scene, materials);
}

const { scene, freeCamera, firstPersonCamera, thirdPersonCamera, fixedCamera, renderer } = initScene();
const dynamicManager = new DynamicManager(scene);
dynamicManager.notifyObservers();
const clickPositionDisplay = new ClickPositionDisplay(scene, freeCamera, renderer);

let activeCamera = freeCamera, activeCameraType = 'freeCamera';

//创建相机控制器
function switchCamera(cameraType) {
    switch (cameraType) {
        case 'free':
            activeCamera = freeCamera;
            activeCameraType = 'freeCamera';
            break;
        case 'firstPerson':
            activeCamera = firstPersonCamera;
            activeCameraType = 'firstPerson';
            break;
        case 'thirdPerson':
            activeCamera = thirdPersonCamera;
            activeCameraType = 'thirdPerson';
            break;
        case 'fixed':
            activeCamera = fixedCamera;
            activeCameraType = 'fixedCamera';
            break;
        default: activeCamera = freeCamera;
            activeCameraType = 'freeCamera';
            break;
    }
}
function updateCamera() {
    const hero = dynamicManager.getDynamicObject('user'); // 假设你的主角物体名为"Hero"


    if (dynamicManager) {
        if (activeCameraType === 'firstPerson') {
            hero.mesh.visible = false;
        }
        else {
            hero.mesh.visible = true;
        }
        // 更新第一人称摄像机位置和方向
        const fpvPositionOffset = new THREE.Vector3(0, 1.6, 0);
        firstPersonCamera.position.copy(hero.currentPosition).add(fpvPositionOffset);
        firstPersonCamera.rotation.copy(hero.mesh.rotation);

        // 更新第三人称摄像机位置和方向
        const positionOffset = new THREE.Vector3(0, 2, -5); // 后上方位置偏移
        const targetOffset = new THREE.Vector3(0, 0, 0);
        thirdPersonCamera.position.copy(hero.currentPosition).add(positionOffset);
        thirdPersonCamera.lookAt(hero.currentPosition);
    }
}


function ModelViewer() {
    const mountRef = useRef(null);
    const [areAnimationsPlaying, setAreAnimationsPlaying] = useState(false);//动画播放状态
    const [isRestart, setIsRestart] = useState(false);//重置状态
    const playingRef = useRef(areAnimationsPlaying); // 新增引用，同步动画播放状态
    const isRestartRef = useRef(isRestart); // 新增引用，同步重置状态
    
    //const [selectedObjectName, setSelectedObjectName] = useState(null);//新增状态，记录当前选中的物体名称

    useEffect(() => {
        playingRef.current = areAnimationsPlaying; // 每次 areAnimationsPlaying 更新时，同步到引用中
        isRestartRef.current = isRestart; // 每次 isRestart 更新时，同步到引用中
        
    }, [areAnimationsPlaying, isRestart]);

    useEffect(() => {
        async function initialize() {

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
            //const dManager = new DynamicManager(scene);
            // const objectSelector = new ObjectSelector(scene, camera, handleObjectSelect);
            // objectSelector.init();



            const onWindowResize = () => {
                freeCamera.aspect = window.innerWidth / window.innerHeight;
                freeCamera.updateProjectionMatrix();
                firstPersonCamera.aspect = window.innerWidth / window.innerHeight;
                firstPersonCamera.updateProjectionMatrix();
                thirdPersonCamera.aspect = window.innerWidth / window.innerHeight;
                thirdPersonCamera.updateProjectionMatrix();
                fixedCamera.aspect = window.innerWidth / window.innerHeight;
                fixedCamera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);
            };




            window.addEventListener('resize', onWindowResize);
            renderer.domElement.addEventListener('click', (event) => clickPositionDisplay.updateCoordinates(event));
            const controls = initCameraControls(activeCamera, renderer);


            const animate = (time) => {
                requestAnimationFrame(animate);
                clickPositionDisplay.notifyObservers();

                const deltaTime = timeManager.update(time);

                if (activeCameraType === 'freeCamera') {
                    controls.update();
                }
                updateCamera(); // 更新摄像机位置和方向

                if (playingRef.current) {
                    //console.log('update animations');
                    dynamicManager.updateScene(deltaTime); // 只有当areAnimationsPlaying为true时才更新动画
                    dynamicManager.notifyObservers();
                }
                else if (isRestartRef.current) {
                    //console.log('restart rendering');
                    dynamicManager.updateScene(deltaTime); // 只有当isRestart为true时才重置动画
                    dynamicManager.notifyObservers();
                    setIsRestart(false); // 重置动画状态，准备播放动画
                }
                renderer.render(scene, activeCamera);
            };
            animate();

            return () => {
                setIsRestart(false);
                setAreAnimationsPlaying(false);
                mount.removeChild(renderer.domElement);
                window.removeEventListener('resize', onWindowResize);

                //objectSelector.destroy();
                controls.dispose();
            };
        }

        initialize();
    }, []);

    const handlePlayPauseClick = () => {
        const temp = !areAnimationsPlaying;
        setAreAnimationsPlaying(temp);
        if (isRestartRef.current) {
            setIsRestart(false);
        }
    };
    const handleResetClick = () => {


        if (!dynamicManager) {
            console.error("Dynamic Manager is not initialized.");
            return;
        }

        dynamicManager.resetAnimations();  // 调用动态管理器的重置函数
        setAreAnimationsPlaying(false);
        setIsRestart(true); // 重置动画状态，准备重启动画
    };

    return (

        <div className="ModelViewer" ref={mountRef}>
            <Box position="absolute" bottom={20} left={20} zIndex="tooltip">
                {dynamicManager &&
                    <AnimationPlayControl
                        toggleAnimations={handlePlayPauseClick}
                        areAnimationsPlaying={areAnimationsPlaying}
                        onResetAnimations={handleResetClick}
                    />
                }

            </Box>
            {dynamicManager &&
                <InfoPanel />
            }
            {dynamicManager &&
                <VideoPlayerCard
                    isPlaying={areAnimationsPlaying}
                    onRestart={isRestartRef.current}

                />}
            <CameraSwitcher switchCamera={switchCamera} />
            {clickPositionDisplay &&
                <CoordinatesCard
                />

            }
        </div>
    );
}

export default ModelViewer;
