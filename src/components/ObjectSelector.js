import * as THREE from 'three';

class ObjectSelector {
    constructor(scene, camera, onObjectSelect) {
        this.camera = camera;
        this.scene = scene;
        this.onObjectSelect = onObjectSelect;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    init() {
        window.addEventListener('click', this.onClick);
    }

    destroy() {
        window.removeEventListener('click', this.onClick);
    }

    onClick = (event) => {
        // 将鼠标位置转换为归一化设备坐标(NDC)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // 通过摄像机和鼠标位置更新射线
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // 计算物体和射线的交点
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const selectedObject = intersects[0].object;
            this.onObjectSelect(selectedObject);
        }
    }
}

export default ObjectSelector;
