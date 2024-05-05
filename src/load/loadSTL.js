import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

function loadSTL(url, position, rotation,scene,material) {
    return new Promise((resolve, reject) => {
        const scale = 1;  // 假设模型以米为单位，而three.js中1单位=1米

        const loader = new STLLoader();
        loader.load(url, (geometry) => {
            //const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 200 });
            const mesh = new THREE.Mesh(geometry, material);

            // 设置模型的位置和大小等属性，根据需要进行调整
            mesh.position.set(...position);
            mesh.rotation.x = Math.PI * -.5;
            mesh.scale.set(scale, scale, scale);
            scene.add(mesh);
            resolve(mesh);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export default loadSTL;