import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';


/**
 * 加载 OBJ 文件并将其作为 Mesh 添加到场景中。
 * @param {string} url - OBJ 文件的 URL 或本地路径。
 * @param {THREE.Scene} scene - 要将模型添加到的 three.js 场景。
 * @param {THREE.Material} material - 应用到模型的材质。
 * @returns {Promise<THREE.Mesh>} 加载完成后返回 Mesh 对象的 Promise。
 */
function loadOBJ(url, position, rotation, scene, material) {
    return new Promise((resolve, reject) => {
        const loader = new OBJLoader();
        loader.load(url, (object) => {
            const geometries = [];
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    // Prepare to merge geometries
                    const geometry = child.geometry.clone();
                    geometry.applyMatrix4(child.matrixWorld);
                    geometries.push(geometry);
                }
            });

            // Merge geometries
            const mergedGeometry = mergeGeometries(geometries);
            if (mergedGeometry) {
                const mergedMesh = new THREE.Mesh(mergedGeometry, material);
                mergedMesh.position.copy(position);
                mergedMesh.rotation.copy(rotation);
                scene.add(mergedMesh);
                resolve(mergedMesh);
            } else {
                reject(new Error('Failed to merge geometries'));
            }
        }, undefined, (error) => {
            reject(error);
        });
    });
}

export default loadOBJ;



