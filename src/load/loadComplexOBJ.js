import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/**
 * 加载复杂 OBJ 文件并应用由 MTL 文件定义的材质。
 * @param {string} url - OBJ 文件的 URL。
 * @param {THREE.Vector3} position - 模型位置。
 * @param {THREE.Euler} rotation - 模型旋转。
 * @param {THREE.Scene} scene - 场景对象。
 * @param {Map<string, THREE.Material>} materialsMap - 材质映射，由 MTL 文件生成。
 * @returns {Promise<THREE.Mesh>} - 返回一个承诺，解决为一个合并后的网格。
 */
function loadComplexOBJ(url, position, rotation, scene, materialsMap) {
    return new Promise((resolve, reject) => {
        const loader = new OBJLoader();
        
        loader.load(url, (object) => {
            const geometries = [];
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    // 应用从 MTL 文件中加载的材质
                    if (materialsMap.has(child.material.name)) {
                        child.material = materialsMap.get(child.material.name);
                    }

                    // 准备合并几何体
                    const geometry = child.geometry.clone();
                    geometry.applyMatrix4(child.matrixWorld);
                    geometries.push(geometry);
                }
            });

            // 合并几何体
            const mergedGeometry = mergeGeometries(geometries);
            if (mergedGeometry) {
                const mergedMesh = new THREE.Mesh(mergedGeometry, new THREE.MeshStandardMaterial());
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

export default loadComplexOBJ;
