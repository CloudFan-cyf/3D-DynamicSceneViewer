import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class DynamicObject {
    constructor(modelUrl, initialPosition, path) {
        this.modelUrl = modelUrl;
        this.position = new THREE.Vector3(...initialPosition);
        this.path = path; // 路径可以是一个包含向量的数组
        this.mesh = null;
    }

    loadModel(scene) {
        const loader = new GLTFLoader();
        return new Promise((resolve, reject) => {
            loader.load(this.modelUrl, (gltf) => {
                this.mesh = gltf.scene;
                this.mesh.position.copy(this.position);
                scene.add(this.mesh);
                resolve(this.mesh);
            }, undefined, reject);
        });
    }

    update(deltaTime) {
        // 根据 deltaTime 更新物体位置
        // 这里我们只是简单地按照路径点更新位置，实际项目中可能需要更复杂的路径计算和动画
        if (this.path && this.path.length > 0) {
            this.position.add(this.path[0]); // 假设path是一个向量的偏移量数组
            if (this.mesh) {
                this.mesh.position.copy(this.position);
            }
        }
    }
}

export default DynamicObject;
