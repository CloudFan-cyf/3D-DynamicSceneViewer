// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * 初始化并返回相机控制器。
 * @param {THREE.Camera} camera - three.js 相机对象
 * @param {THREE.Renderer} renderer - three.js 渲染器对象
 * @returns {OrbitControls} 控制器对象
 */
function initCameraControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement);

    // 设置控制器的参数以优化用户体验
    controls.enableDamping = true; // 启用阻尼（惯性），这将给控制器带来更平滑的感觉。
    controls.dampingFactor = 0.05; // 阻尼系数
    controls.screenSpacePanning = false; // 设置平移是屏幕空间移动还是垂直移动

    

    return controls;
}

export default initCameraControls;
