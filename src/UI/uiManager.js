import ClickPositionDisplay from './clickPositionDisplay.js';

class UIManager {
    constructor(scene, camera, renderer) {
        this.scene = scene;
        this.clickPositionDisplay = new ClickPositionDisplay(scene, camera, renderer); // 创建点击位置显示组件
        this.renderer = renderer;
    }

    handleCanvasClick(event) {
        // 处理画布上的点击事件，更新点击位置的显示
        this.clickPositionDisplay.updateCoordinates(event);
    }

    initListeners() {
        // 初始化事件监听器，监听画布的点击事件
        this.renderer.domElement.addEventListener('click', (event) => this.handleCanvasClick(event));
    }
}

export default UIManager;
