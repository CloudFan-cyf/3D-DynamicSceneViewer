import * as THREE from 'three';

/**
 * 初始化并返回一个 three.js 场景，包括相机和基础灯光配置。
 * @returns {object} 包含 scene, camera 和 renderer 的对象。
 */
function initScene() {
    // 创建场景
    const scene = new THREE.Scene();

    // 设置背景颜色
    scene.background = new THREE.Color(0xaaaaaa);

    // 构建创建相机的函数
    function createCamera(fov, aspect, near, far) {
        return new THREE.PerspectiveCamera(fov, aspect, near, far);
    }

    // 创建相机
    const camera = createCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 10, 0);  // 相机位置
    camera.up.set(0, 1, 0);

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.physicallyCorrectLights = true;
    //renderer.outputEncoding = THREE.sRGBEncoding;
    
    
    // 添加基础灯光
    const ambientLight = new THREE.AmbientLight(0x404040,10); // 环境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 方向光
    directionalLight.position.set(0, 100, 100);
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);

    // 返回 scene, camera 和 renderer
    return { scene, camera, renderer };
}

export default initScene;
