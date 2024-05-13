import DynamicObject from './dynamicObjects';
import * as THREE from 'three';
import DYNAMIC_MODELS_DATA from './dynamicModelList';

class DynamicManager {
    static instance = null;
    static initializing = false;
    static initializePromise = null;


    constructor(scene) {
        if (DynamicManager.instance) {
            return DynamicManager.instance;
        }
        this.scene = scene;
        this.dynamicObjects = [];
        this.models = DYNAMIC_MODELS_DATA;
        this.observers = [];
        
        DynamicManager.instance = this;
        DynamicManager.initializing = true;
        DynamicManager.initializePromise = this.initialize().then(() => {
            console.log("DynamicManager initialized successfully.");
            DynamicManager.initializing = false;
            return this; // 确保初始化Promise解决为DynamicManager实例
        }).catch(error => {
            console.error("Failed to initialize Dynamic Manager:", error);
            DynamicManager.initializing = false;
        });
    }

    static async getInstance() {
        if (DynamicManager.instance) {
            return Promise.resolve(DynamicManager.instance);
        } 
        else {
            // 如果instance不存在且没有在初始化，则启动一个等待过程
            return new Promise((resolve, reject) => {
                const waitInterval = setInterval(() => {
                    if (DynamicManager.instance) {
                        clearInterval(waitInterval);
                        console.log("get DynamicManager instance successfully.");
                        resolve(DynamicManager.instance);
                    }
                }, 100); // 每100毫秒检查一次
            });
        }
    }

    async initialize() {
        await this.loadAllDynamicObjects();
    }

    async loadAllDynamicObjects() {
        this.models.forEach(model => {
            if (model.enable) {
                model.instances.forEach(instance => {
                    this.addDynamicObject(
                        model.type, model.modelname, model.url, instance.instanceName,
                        instance.position, instance.path,
                        instance.rotation, instance.scale,
                        instance.speed, model.skeleton_enable);
                });
            }
        });
    }

    addDynamicObject(modelType, modelName, modelUrl, instanceName, position, path, rotation, scale, speedPoints, skeletonEnable) {
        const dynamicObject = new DynamicObject(
            modelType,modelName, modelUrl, instanceName,
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
        //console.log('Resetting all dynamic objects animations');
        this.dynamicObjects.forEach(obj => {
            obj.reset();
        });
    }

    getAllDynamicObjects() {
        return this.dynamicObjects;
    }

    getDynamicObject(name) {
        return this.dynamicObjects.find(obj => obj.instanceName === name);
    }

    subscribe(observerFunction) {
        this.observers.push(observerFunction);
        console.log("Subscribed", this.observers.length); // 检查订阅者数量
    }

    unsubscribe(observerFunction) {
        this.observers = this.observers.filter(observer => observer !== observerFunction);
        console.log("Unsubscribed", this.observers.length); // 检查剩余订阅者数量
    }

    notifyObservers() {
        this.observers.forEach(observer => {
            observer(this.dynamicObjects);
        });
    }

    updateDynamicObjects(newObjects) {
        console.log("Updating dynamic objects", newObjects); // 确认此行是否被执行和打印
        this.dynamicObjects = newObjects;
        this.notifyObservers();
    }

    comfirm(){
        console.log("comfirmed Scene",this.scene);
        console.log("comfirmed DynamicObjects",this.dynamicObjects);
    }
}

export default DynamicManager;
