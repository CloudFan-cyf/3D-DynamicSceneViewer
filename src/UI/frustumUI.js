import * as THREE from 'three';

function createFrustumGeometry(camera) {
    const aspect = camera.aspect;
    const FOV = camera.fov * Math.PI / 180; // 将角度转换为弧度
    const nearHeight = 2 * Math.tan(FOV / 2) * camera.near;
    const nearWidth = nearHeight * aspect;
    const farHeight = 2 * Math.tan(FOV / 2) * camera.far;
    const farWidth = farHeight * aspect;

    // 创建顶点数组
    const vertices = new Float32Array([
        // 近裁剪面顶点
        -nearWidth / 2, -nearHeight / 2, -camera.near,  // 左下
        nearWidth / 2, -nearHeight / 2, -camera.near,  // 右下
        nearWidth / 2, nearHeight / 2, -camera.near,  // 右上
        -nearWidth / 2, nearHeight / 2, -camera.near,  // 左上
        // 远裁剪面顶点
        -farWidth / 2, -farHeight / 2, -camera.far,    // 左下
        farWidth / 2, -farHeight / 2, -camera.far,    // 右下
        farWidth / 2, farHeight / 2, -camera.far,    // 右上
        -farWidth / 2, farHeight / 2, -camera.far     // 左上
    ]);

    // 创建索引数组来定义视锥的面
    const indices = [
        0, 1, 2, 0, 2, 3,  // 近裁剪面
        4, 5, 6, 4, 6, 7,  // 远裁剪面
        0, 4, 5, 0, 5, 1,  // 侧面
        1, 5, 6, 1, 6, 2,
        2, 6, 7, 2, 7, 3,
        3, 7, 4, 3, 4, 0
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setIndex(indices);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    return geometry;
}
function addEdgesToFrustum(frustumMesh, scene) {
    const edgesGeometry = new THREE.EdgesGeometry(frustumMesh.geometry); // 从视锥的几何体中生成轮廓线几何体
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 }); // 设置轮廓线材料为白色
    const edgesMesh = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    scene.add(edgesMesh);
    edgesMesh.position.copy(frustumMesh.position); // 确保轮廓线与视锥的位置一致
    edgesMesh.quaternion.copy(frustumMesh.quaternion); // 确保轮廓线与视锥的方向一致

    return edgesMesh; // 返回轮廓线对象，以便于管理
}

// 在场景中添加视锥
function addCameraFrustumToScene(camera, scene) {
    const frustumGeometry = createFrustumGeometry(camera);
    const frustumMaterial = new THREE.MeshBasicMaterial({
        color: 0x00aaff, // 选择一个柔和的天蓝色
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide // 双面材料，内部外部都可见
    });

    const frustumMesh = new THREE.Mesh(frustumGeometry, frustumMaterial);
    
    scene.add(frustumMesh);
    // 添加轮廓线
    const edgesMesh = addEdgesToFrustum(frustumMesh, scene);


    return {frustumMesh,edgesMesh};
}



export default addCameraFrustumToScene;

