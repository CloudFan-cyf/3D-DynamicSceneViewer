import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

/**
 * 加载单个纹理
 * @param {string} path 纹理路径
 * @param {function} onLoad 可选的加载成功后的回调函数
 * @returns {THREE.Texture} 纹理对象
 */
function loadTexture(path, onLoad) {
    const loader = new THREE.TextureLoader();
    return loader.load(
        path,
        function (texture) {
            // 当纹理加载完成后调用
            texture.wrapS = THREE.RepeatWrapping;  // 设置水平方向上纹理重复
            texture.wrapT = THREE.RepeatWrapping;  // 设置垂直方向上纹理重复
            texture.repeat.set(1, 1);  // 根据模型的实际尺寸来调整重复次数
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            if (onLoad) {
                onLoad(texture);
            }
        },
        undefined,  // onProgress 可选
        function (error) {  // onError 回调
            console.error('Error loading texture:', path, error.message);
        }
    );
}


/**
 * 创建复杂的 PBR 材质
 * @param {object} options 包含纹理路径的对象
 * @returns {THREE.MeshStandardMaterial} 材质
 */
function createComplexMaterial(options) {
    const {
        diffuse = '',
        normal = '',
        ao = '',
        rough = '',
        displacement = ''
    } = options;

    const material = new THREE.MeshStandardMaterial({
        map: loadTexture(diffuse),
        normalMap: loadTexture(normal),
        aoMap: loadTexture(ao),
        roughnessMap: loadTexture(rough),
        displacementMap: loadTexture(displacement),
        aoMapIntensity: 1.0,
        side: THREE.FrontSide
    });

    // 如果使用位移纹理，还需要配置材质以适应位移效果
    if (displacement) {
        material.displacementScale = 0.001; // 根据需要调整位移比例
    }
    
    

    return material;
}

/**
 * 创建MTL格式的材质
 * @param {url} options 包含MTL文件路径
 * @returns {THREE.MeshStandardMaterial} 材质
 */
function createMTLMaterial(mtlUrl) {
    return new Promise((resolve, reject) => {
        const loader = new MTLLoader();
        loader.load(mtlUrl, (materialCreator) => {
            // `preload` 确保材质的纹理等资源被加载。
            materialCreator.preload();
            const materialsMap = new Map();

            // `materialCreator.materials` 是一个包含所有材质的对象。
            for (const materialName in materialCreator.materials) {
                const material = materialCreator.materials[materialName];
                materialsMap.set(materialName, material);
            }
            resolve(materialsMap);
        }, undefined, error => {
            reject(error);
        });
    });

}

/**
 * 创建并返回一个包含多种材质的对象
 * @returns {object} 材质对象集合
 */
function createMaterials() {
    return {
        roadForPeople: createComplexMaterial({
            diffuse: 'textures/brickPaveMent/brick_pavement_diff.jpg',
            normal: 'textures/brickPaveMent/brick_pavement_nor_gl.jpg',
            ao: 'textures/brickPaveMent/brick_pavement_ao.jpg',
            rough: 'textures/brickPaveMent/brick_pavement_rough.jpg',
            displacement: 'textures/brickPaveMent/brick_pavement_disp.jpg'
        }),
        roadForVehicles: createComplexMaterial({
            diffuse: 'textures/road/road_diff.jpg',
            normal: 'textures/road/road_nor_gl.jpg',
            ao: 'textures/road/road_ao.jpg',
            rough: 'textures/road/road_rough.jpg',
            displacement: 'textures/road/road_disp.jpg'
        }),
        roadSide: createComplexMaterial({
            diffuse: 'textures/roadSide/roadside_diff.jpg',
            normal: 'textures/roadSide/roadside_nor_gl.jpg',
            ao: 'textures/roadSide/roadside_ao.jpg',
            rough: 'textures/roadSide/roadside_rough.jpg',
            displacement: 'textures/roadSide/roadside_disp.jpg'
        }),
        grass: createComplexMaterial({
            diffuse: 'textures/grass/grass_diff.jpg',
            normal: 'textures/grass/grass_nor_gl.jpg',
            ao: 'textures/grass/grass_ao.jpg',
            rough: 'textures/grass/grass_rough.jpg',
            displacement: 'textures/grass/grass_disp.jpg'

        }),
        stairs: createComplexMaterial({
            diffuse: 'textures/stair/stair_diff.jpg',
            normal: 'textures/stair/stair_nor_gl.jpg',
            ao: 'textures/stair/stair_ao.jpg',
            rough: 'textures/stair/stair_rough.jpg',
            displacement: 'textures/stair/stair_disp.jpg'

        }),
        barrier: createComplexMaterial({
            diffuse: 'textures/barrier/barrier_diff.jpg',
            normal: 'textures/barrier/barrier_nor_gl.jpg',
            ao: 'textures/barrier/barrier_ao.jpg',
            rough: 'textures/barrier/barrier_rough.jpg',
            displacement: 'textures/barrier/barrier_disp.jpg'

        }),
        bicycle: createMTLMaterial('/sceneModels/bike/bikered.mtl'),



    };
}

export default createMaterials;
