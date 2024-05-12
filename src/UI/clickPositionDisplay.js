import * as THREE from 'three';

class ClickPositionDisplay {
    constructor(scene, camera, renderer) {
        this.scene = scene;          // 3D场景对象
        this.camera = camera;        // 3D场景中的相机
        this.renderer = renderer;    // 渲染器
        this.raycaster = new THREE.Raycaster(); // 射线投射器，用于确定鼠标点击的3D位置
        this.mouse = new THREE.Vector2();       // 保存鼠标点击的二维坐标
        this.initUI();               // 初始化显示坐标的HTML元素
    }

    initUI() {
        // 创建一个新的div元素并添加到文档中
        this.div = document.createElement('div');
        document.body.appendChild(this.div);
        // 设置样式
        this.div.style.position = 'absolute';
        this.div.style.top = '80px';
        this.div.style.left = '20px';
        this.div.style.color = 'white';
        this.div.style.fontFamily = 'Arial';
        this.div.style.fontSize = '14px';
        this.div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.div.style.padding = '8px';
        this.div.style.borderRadius = '5px';
        this.div.innerHTML = 'get coordinates';
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
            const { x, y, z } = intersects[0].point;
            // 更新显示的坐标
            this.div.innerHTML = `Coordinates: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z.toFixed(2)}`;
        }
    }
}

export default ClickPositionDisplay;
