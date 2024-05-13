import * as THREE from 'three';

class ClickPositionDisplay {
    static instance = null;
    constructor(scene, camera, renderer) {
        if(ClickPositionDisplay.instance) {
            return ClickPositionDisplay.instance;
        }
        ClickPositionDisplay.instance = this;
        this.scene = scene;          // 3D场景对象
        this.camera = camera;        // 3D场景中的相机
        this.renderer = renderer;    // 渲染器
        this.raycaster = new THREE.Raycaster(); // 射线投射器，用于确定鼠标点击的3D位置
        this.mouse = new THREE.Vector2();       // 保存鼠标点击的二维坐标
        this.point = new THREE.Vector3(0, 0, 0);       // 保存射线与场景中对象的交点坐标
        this.observers = [];
    }

    static async getInstance(){
        if(ClickPositionDisplay.instance) {
            return ClickPositionDisplay.instance;
        }
        else {
            return new Promise((resolve, reject) => {
                const waitInterval = setInterval(() => {
                    if (ClickPositionDisplay.instance) {
                        clearInterval(waitInterval);
                        console.log("get ClickPositionDisplay instance successfully.");
                        resolve(ClickPositionDisplay.instance);
                    }
                }, 100); // 每100毫秒检查一次'
            });
        }
    }

    updateCoordinates(event) {
        // 更新鼠标位置
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        // 设置射线的起点为鼠标位置
        this.raycaster.setFromCamera(this.mouse, this.camera);
        // 计算射线与场景中对象的交点
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            // 获取第一个交点的坐标
            
            this.point = intersects[0].point;
            //console.log(this.point);
        }
    }

    subscribe(observerFunction) {
        this.observers.push(observerFunction);

    }

    unsubscribe(observerFunction) {
        this.observers = this.observers.filter(observer => observer !== observerFunction);
    }

    notifyObservers() {
        this.observers.forEach(observer => {
            observer(this.point);
        });
    }
}

export default ClickPositionDisplay;
