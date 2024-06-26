// eslint-disable-next-line no-unused-vars
import * as THREE from 'three'
import loadOBJ from './loadOBJ';
import loadStaticGltf from './loadStaticGltf';
import loadComplexOBJ from './loadComplexOBJ';
//import createMaterials from '../three/createMaterials';
import MODELS_DATA from './staticModelList';
import loadOSM from '../osm/loadOSM';
import loadSkyBox from './loadSkyBox';


// 场景原点的经纬度
const originLatitude = 40.178579; // 纬度
const originLongitude = 116.156975; // 经度
class staticLoadManager {
    constructor(scene,materials) {
        this.scene = scene;
        this.materials = materials;
        this.models = MODELS_DATA; // 使用外部定义的模型数据
        this.OSMurl = '/osm/export.geojson';
        this.SkyBoxUrl = '/textures/skybox/skybox.jpg';
    }

    async loadModels() {
        return Promise.all(this.models.flatMap(model => {
            if (!model.enable) {
                return []; // 如果模型不需要被加载，跳过
            }
            return model.instances.map(async instance => {
                const { position, rotation, scale } = instance;
                switch (model.type) {
                    case 'gltf':
                        try {
                            const mesh = await loadStaticGltf(model, this.scene);
                            console.log(`Model loaded successfully: ${model.url}`, mesh);
                            return mesh;
                        } catch (error) {
                            console.error(`Failed to load model: ${model.url}`, error);
                            throw error; // Rethrow to ensure Promise.all catches it
                        }
                    case 'obj':
                        const material = this.materials[model.name];
                        try {
                            const mesh_1 = await loadOBJ(model.url, position, rotation, this.scene, material, scale);
                            console.log(`Model loaded successfully: ${model.url} with material: ${model.name}`, mesh_1);
                            return mesh_1;
                        } catch (error_1) {
                            console.error(`Failed to load model: ${model.url} with material: ${model.name}`, error_1);
                            throw error_1; // Rethrow to ensure Promise.all catches it
                        }
                    case 'complex_obj':
                        const materials = this.materials[model.name];
                        try {
                            const mesh_2 = await loadComplexOBJ(model.url, position, rotation, this.scene, materials, scale);
                            console.log(`Model loaded successfully: ${model.url} with materials: ${model.name}`, mesh_2);
                            return mesh_2;
                        } catch (error_2) {
                            console.error(`Failed to load model: ${model.url} with materials: ${model.name}`, error_2);
                            throw error_2; // Rethrow to ensure Promise.all catches it
                        }
                    default:
                        console.error(`Unsupported model type: ${model.type}`);
                        throw new Error(`Unsupported model type: ${model.type}`);
                }
            });
        })).catch(error => {
            console.error("One or more models failed to load.", error);
        });
    }
    async implementedLoadOSM() {
        await loadOSM(this.OSMurl, originLatitude, originLongitude, this.scene,this.materials['building']);
    }
    async implementedLoadSkyBox() {
        await loadSkyBox(this.SkyBoxUrl, this.scene);
    }
    
}

export default staticLoadManager;
