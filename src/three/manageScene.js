import DynamicObject from './dynamicObjects';
// eslint-disable-next-line no-unused-vars
import * as THREE from 'three';

class SceneManage {
    constructor(scene) {
        this.scene = scene;
        this.dynamicObjects = [];
    }

    addDynamicObject(modelUrl, position, path) {
        const dynamicObject = new DynamicObject(modelUrl, position, path);
        dynamicObject.loadModel(this.scene).then(() => {
            this.dynamicObjects.push(dynamicObject);
            console.log('Dynamic object added to the scene');
        }).catch(error => {
            console.error('Error loading the dynamic object:', error);
        });
    }

    updateScene(deltaTime) {
        this.dynamicObjects.forEach(obj => obj.update(deltaTime));
    }
}

export default SceneManage;
