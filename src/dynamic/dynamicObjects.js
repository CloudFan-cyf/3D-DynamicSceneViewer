import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class DynamicObject {
    constructor(modelName, modelUrl, initialPosition, pathPoints, rotation, speedPoints, skeleton_enable) {
        this.modelName = modelName;
        this.modelUrl = modelUrl;
        this.initialPosition = new THREE.Vector3(...initialPosition);
        this.initialRotation = rotation;
        this.pathPoints = pathPoints.map(p => new THREE.Vector3(...p));
        this.speedPoints = speedPoints.map(p => new THREE.Vector2(...p));  // 时间节点对应的速度
        this.speed = 0; // 当前速度，由速度曲线决定
        this.mesh = null;
        this.mixer = null;
        this.curve = null;
        this.curveLength = 0;
        this.progress = 0; // 进度参数，用于计算沿曲线的位置
        this.animations = [];// 动画列表
        this.currentAnimation = null;// 当前动画名称
        this.totalTime = 0; // 总时间，用于计算动画播放进度
        this.skeleton_enable = skeleton_enable;//是否启用骨骼，如果启用则可以根据名字选择播放动画；反之则必须全部播放动画

        //for debug
        this.pathLine = null;
        this.directionHelper = null;
    }

    createPath() {
        // 创建样条曲线
        this.curve = new THREE.CatmullRomCurve3(this.pathPoints);
        this.speedCurve = new THREE.SplineCurve(this.speedPoints);
        this.curve.curveType = 'catmullrom';
        this.curve.tension = 0.5;
        this.curveLength = this.curve.getLength();
        console.log(`${this.modelName} :Curve length: ${this.curveLength}`);
    }

    //for   debug
    addPathToScene(scene) {
        // 创建路径线材质和几何体
        const pathGeometry = new THREE.BufferGeometry().setFromPoints(this.pathPoints);
        const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        this.pathLine = new THREE.Line(pathGeometry, pathMaterial);
        scene.add(this.pathLine);
    }

    loadModel(scene) {
        const loader = new GLTFLoader();

        return new Promise((resolve, reject) => {
            loader.load(this.modelUrl, (gltf) => {
                this.mesh = gltf.scene;
                this.mesh.position.copy(this.initialPosition);

                //this.mesh.rotation.set(this.initialRotation.x, this.initialRotation.y, this.initialRotation.z);

                scene.add(this.mesh);
                this.mesh.traverse(function (object) {
                    if (object.isMesh) {
                        object.castShadow = true;
                    }
                })
                this.addPathToScene(scene)

                if (gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(this.mesh);
                    gltf.animations.forEach(animation => {
                        const action = this.mixer.clipAction(animation);
                        this.animations[animation.name] = action; // 将动画保存到一个对象中，以便可以按名称访问
                        if (!this.skeleton_enable) {
                            action.play();
                        }
                        //action.play();
                    });
                }

                this.createPath(); // 创建路径
                resolve(this.mesh);
            }, undefined, reject);
        });
    }

    // 用于控制动画的函数，在特定事件触发时调用
    //请注意：如果动画名称不正确，则不会播放动画，在blender中创建时必须确定好动画名称
    playAnimation(name) {
        if (this.currentAnimation !== name) {
            const action = this.animations[name];
            this.mixer.stopAllAction();
            action.play();
            this.currentAnimation = name;
        }
    }

    update(deltaTime) {
        let position, nextPosition, direction, angle;
        if (this.curveLength > 0) {
            if (this.progress < 1) {

                //如果有移动路径，则更新进度和位置
                // 更新动画
                if (this.mixer) {
                    this.mixer.update(deltaTime);
                }

                // 更新进度
                this.totalTime += deltaTime; // 总时间累计
                this.speed = this.speedCurve.getPoint(this.totalTime / this.speedCurve.getLength()).y; // 根据当前总时间获取速度
                this.progress += (deltaTime * this.speed) / this.curveLength;
                this.progress = Math.min(this.progress, 1); // 限制进度在0-1之间

                // 计算当前进度的位置
                position = this.curve.getPoint(this.progress);
                nextPosition = this.curve.getPoint(Math.min(this.progress + 0.001, 1));
                if (this.skeleton_enable) {
                    //console.log(`Speed at progress ${this.progress}: ${this.speed}`);
                    if (this.speed > 0) {
                        this.playAnimation('walk'); // 如果速度大于0，播放行走动画
                    } else {
                        this.playAnimation('idle'); // 否则播放闲置动画
                    }
                }

                this.mesh.position.copy(position);

                // 计算方向并旋转模型
                if (this.progress < 1) {
                    direction = nextPosition.clone().sub(position).normalize();
                    angle = Math.atan2(direction.x, direction.z);
                    this.mesh.rotation.y = -Math.PI + angle;// 根据方向旋转Y轴
                }
                else {
                    //this.mesh.rotation.y = -Math.PI + angle;// 根据方向旋转Y轴
                }

            }
            else {
                // 路径结束，停止动画
                //this.mesh.rotation.y = -Math.PI + angle; // 根据方向旋转Y轴
                if(this.skeleton_enable){
                    //console.log('stop animation')
                    if (this.mixer) {
                        this.mixer.update(deltaTime);
                    }
        
                    this.playAnimation('idle');
    
                }
            }
        }
        else {
            //没有路径，不更新位置，只更新动画
            if(this.skeleton_enable){
                if (this.mixer) {
                    this.mixer.update(deltaTime);
                }
    
                this.playAnimation('idle');

            }
            


        }
    }
}

export default DynamicObject;
