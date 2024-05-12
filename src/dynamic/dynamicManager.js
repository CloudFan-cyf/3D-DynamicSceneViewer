import DynamicObject from './dynamicObjects';
import * as THREE from 'three';
import DYNAMIC_MODELS_DATA from './dynamicModelList';

class DynamicManager {
    constructor(scene) {
        this.scene = scene;
        this.dynamicObjects = [];
        this.models = DYNAMIC_MODELS_DATA;
        this.loadAllDynamicObjects();
    }

    loadAllDynamicObjects() {
        this.models.forEach(model => {
            if (model.enable) {
                model.instances.forEach(instance => {
                    this.addDynamicObject(
                        model.name, model.url,
                        instance.position, instance.path,
                        instance.rotation, instance.scale,
                        instance.speed, model.skeleton_enable);
                });
            }
        });
    }

    addDynamicObject(modelName, modelUrl, position, path, rotation, scale, speedPoints, skeletonEnable) {
        const dynamicObject = new DynamicObject(
            modelName, modelUrl,
            position, path, rotation,
            speedPoints, skeletonEnable);
        dynamicObject.loadModel(this.scene).then(() => {

            if (scale) {
                dynamicObject.mesh.scale.set(scale.x, scale.y, scale.z);
            }
            this.dynamicObjects.push(dynamicObject);
            console.log('Dynamic object added to the scene:', dynamicObject);
        }).catch(error => {
            console.error('Error loading the dynamic object:', error);
        });
    }
    //更新所有动态物体的位置和动画
    updateScene(deltaTime) {
        this.dynamicObjects.forEach(obj => obj.update(deltaTime));
    }

    //重置所有动态物体的动画
    resetAnimations() {
        console.log('Resetting all dynamic objects animations');
        this.dynamicObjects.forEach(obj => {
            obj.reset();
        });
    }

    getDynamicObject(name) {
        return this.dynamicObjects.find(obj => obj.name === name);
    }
}

export default DynamicManager;
