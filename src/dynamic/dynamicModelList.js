// This file is used to store the data of all models in the scene.
// modelsData.js
const DYNAMIC_MODELS_DATA = [
    {
        type: 'Human',
        modelname: 'user',
        url: '/sceneModels/people/user.glb',
        skeleton_enable: true,
        enable: true,
        instances: [
            {
                instanceName: 'user',
                position: [6.5, 0, 4.8],
                path: [[6.5, 0, 4.8], [6.5, 0, 0], [6.5, 0, -6.5]],
                speed: [[0, 0], [1, 0], [2, 0], [3, 0.2], [4, 0.3], [5, 0.3], [6, 0.3], [7, 0.3], [8, 0.3], [9, 0.4], [10, 0.4],
                [11, 0.2], [12, 0], [13, 0], [14, 0], [15,0], [16, 0], [17, 0.3], [18, 0.5], [19, 0.6], [20, 0.6],
                [21, 0.6], [22, 0.6], [23, 0.6], [24, 0.6], [25, 0.5], [26, 0.5], [27, 0.5], [28, 0.5], [29,0.5], [30, 0.4],
                [31, 0.4], [32, 0.4], [33, 0.4],[34,0.4],[35,0.4],[50,0.4]],
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }

            },

        ],

    },
    {
        type: 'Human',
        modelname: 'pedestrians',
        url: '/sceneModels/people/pedestrains.glb',
        skeleton_enable: true,
        enable: true,
        instances: [
            {
                instanceName: 'pedestrian1',
                position: [9, 0, -2.813],
                path: [[9.490, 0, -2.813], [9.490, 0, -2.813]],
                speed: [[0, 0], [10, 0], [30, 0]],
                rotation: { x: 0, y: Math.PI, z: 0 },
                scale: { x: 1, y: 1, z: 1 }

            },


        ],

    },
    {
        type: 'Vehicles',
        modelname: 'bicycle',
        url: '/sceneModels/bike/bicycle.glb',
        skeleton_enable: false,
        enable: true,
        instances: [
            {
                instanceName: 'bicycle1',
                position: [27, 0, 0],
                path: [[27, 0, 0], [9, 0, 0], [-3, 0, 0]],
                speed: [[0, 1.35],[10,1.35],[11,1.5],[100, 1.5]],
                rotation: { x: 0, y: Math.PI / 2, z: 0 },
                scale: { x: 0.6, y: 0.6, z: 0.6 }
            },//正常行驶的车
            {
                instanceName: 'bicycle2',
                position: [-20, 0, -1],
                path: [[-20, 0, -1], [3, 0, -1],[7,0,-5],[8,0,-5],[13,0,-5]],
                speed: [[0, 0.3],[1,0.7],[2,0.7],[3,1],[4,1],[5,1],[6,3],[7,3], [200, 1]],
                rotation: { x: 0, y: -Math.PI / 2, z: 0 },
                scale: { x: 0.6, y: 0.6, z: 0.6 }
            },//突然插入的车
        ],
    },
    // 更多模型可以添加到这个数组
];

export default DYNAMIC_MODELS_DATA;