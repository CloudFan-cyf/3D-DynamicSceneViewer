// loadGltf.js
// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * 加载一个 GLTF 文件并将其实例添加到场景中。
 * @param {object} model - 包含单个模型信息的对象。
 * @param {THREE.Scene} scene - 要将模型添加到的 three.js 场景。
 * @returns {Promise<THREE.Group[]>} 加载完成后返回一个包含 Group 对象的 Promise 数组。
 */
function loadGltf(model, scene) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
        loader.load(model.url, (gltf) => {
            const instances = [];
            model.instances.forEach(instanceData => {
                const instance = gltf.scene.clone();
                instance.position.copy(instanceData.position);
                instance.rotation.copy(instanceData.rotation);
                //instance.scale.set(instanceData.scale.x, instanceData.scale.y, instanceData.scale.z);
                scene.add(instance);
                instances.push(instance);
            });
            resolve(instances);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export default loadGltf;