import * as THREE from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

/**
 * 加载单个纹理
 * @param {string} path 纹理路径
 * @param {function} onLoad 可选的加载成功后的回调函数
 * @returns {THREE.Texture} 纹理对象
 */
function loadTexture(path,repeatx,repeaty) {
    const loader = new THREE.TextureLoader();
    return new Promise((resolve, reject) => {
        loader.load(path, (texture) => {
            console.log('Texture loaded successfully:', path);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(repeatx, repeaty);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            resolve(texture);
        }, undefined, (error) => {
            console.error('Error loading texture:', path, error);
            reject(error);
        });
    });
}




/**
 * 创建复杂的 PBR 材质
 * @param {object} options 包含纹理路径的对象
 * @returns {THREE.MeshStandardMaterial} 材质
 */
async function createComplexMaterial(options) {
    const {
        diffuse = '',
        normal = '',
        ao = '',
        rough = '',
        displacement = '',
        mentalness = '',
        repeatx = 1,
        repeaty = 1,
    } = options;

    const material = new THREE.MeshStandardMaterial({
        map: diffuse ? await loadTexture(diffuse,repeatx,repeaty) : null,
        normalMap: normal ? await loadTexture(normal,repeatx,repeaty) : null,
        aoMap: ao ? await loadTexture(ao,repeatx,repeaty) : null,
        roughnessMap: rough ? await loadTexture(rough,repeatx,repeaty) : null,
        displacementMap: displacement ? await loadTexture(displacement,repeatx,repeaty) : null,
        mentalnessMap: mentalness ? await loadTexture(mentalness,repeatx,repeaty) : null,
        aoMapIntensity: 1.0,
        side: THREE.FrontSide
    });

    if (displacement) {
        material.displacementScale = 0.001;
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
async function createMaterials() {
    return {
        roadForPeople:await createComplexMaterial({
            diffuse: 'textures/brickPaveMent/brick_pavement_diff.jpg',
            normal: 'textures/brickPaveMent/brick_pavement_nor_gl.jpg',
            ao: 'textures/brickPaveMent/brick_pavement_ao.jpg',
            rough: 'textures/brickPaveMent/brick_pavement_rough.jpg',
            displacement: 'textures/brickPaveMent/brick_pavement_disp.jpg'
        }),
        roadForVehicles:await createComplexMaterial({
            diffuse: 'textures/road/road_diff.jpg',
            normal: 'textures/road/road_nor_gl.jpg',
            ao: 'textures/road/road_ao.jpg',
            rough: 'textures/road/road_rough.jpg',
            displacement: 'textures/road/road_disp.jpg'
        }),
        roadSide:await createComplexMaterial({
            diffuse: 'textures/roadSide/roadside_diff.jpg',
            normal: 'textures/roadSide/roadside_nor_gl.jpg',
            ao: 'textures/roadSide/roadside_ao.jpg',
            rough: 'textures/roadSide/roadside_rough.jpg',
            displacement: 'textures/roadSide/roadside_disp.jpg'
        }),
        grass:await createComplexMaterial({
            diffuse: 'textures/grass/grass_diff.jpg',
            normal: 'textures/grass/grass_nor_gl.jpg',
            ao: 'textures/grass/grass_ao.jpg',
            rough: 'textures/grass/grass_rough.jpg',
            displacement: 'textures/grass/grass_disp.jpg'

        }),
        stairs:await createComplexMaterial({
            diffuse: 'textures/stair/stair_diff.jpg',
            normal: 'textures/stair/stair_nor_gl.jpg',
            ao: 'textures/stair/stair_ao.jpg',
            rough: 'textures/stair/stair_rough.jpg',
            displacement: 'textures/stair/stair_disp.jpg'

        }),
        barrier:await createComplexMaterial({
            diffuse: 'textures/barrier/barrier_diff.jpg',
            normal: 'textures/barrier/barrier_nor_gl.jpg',
            ao: 'textures/barrier/barrier_ao.jpg',
            rough: 'textures/barrier/barrier_rough.jpg',
            displacement: 'textures/barrier/barrier_disp.jpg'

        }),
        roof:await createComplexMaterial({
            diffuse: 'textures/roof/roof_diff_1.jpg',
            normal: 'textures/roof/roof_nor_gl.jpg',
            ao: 'textures/roof/roof_ao.jpg',
            rough: 'textures/roof/roof_rough.jpg',
            displacement: 'textures/roof/roof_disp.jpg'

        }),
        concrete:await createComplexMaterial({
            diffuse: 'textures/concrete/concrete_diff.jpg',
            normal: 'textures/concrete/concrete_nor_gl.jpg',
            ao: 'textures/concrete/concrete_ao.jpg',
            rough: 'textures/concrete/concrete_rough.jpg',
            displacement: 'textures/concrete/concrete_disp.jpg'

        }),
        building:await createComplexMaterial({
            diffuse: 'textures/building/building_diff.jpg',
            normal: 'textures/building/building_nor_gl.jpg',
            mentalness: 'textures/building/building_mentalness.jpg',
            rough: 'textures/building/building_rough.jpg',
            displacement: 'textures/building/building_disp.jpg',
            repeatx: 0.05,
            repeaty: 0.1,
        }),
    };
}

export default createMaterials;
