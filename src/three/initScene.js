import * as THREE from 'three';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js';
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
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.physicallyCorrectLights = true;
    //renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    
    //添加地面
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);  // 大小根据实际需求调整
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });  // 可以用纹理替换颜色
    const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = -Math.PI / 2;  // 将平面旋转到水平位置
    groundPlane.position.y = -0.01;  // 地面的高度，可以根据需要进行调整
    groundPlane.receiveShadow = true;  // 开启接收阴影
    scene.add(groundPlane);



    // 添加基础灯光
    const ambientLight = new THREE.AmbientLight(0x404040, 5); // 环境光
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // 方向光
    directionalLight.position.set(-50, 50, 4);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.far = 1000;
    directionalLight.shadow.camera.zoom = 0.1;
    scene.add(directionalLight);

    // 返回 scene, camera 和 renderer
    return { scene, camera, renderer };
}

export default initScene;
