// This file is used to store the data of all models in the scene.
// modelsData.js
const DYNAMIC_MODELS_DATA = [
    {
        type: 'gltf',
        name: 'user',
        url: '/sceneModels/people/user.glb',
        skeleton_enable: true,
        enable: true,
        instances: [
            {
                position: [6.5, 0, 3.2],
                path: [[6.5, 0, 3.2], [6.5, 0, 0], [6.5, 0, -3]],
                speed: [[0, 1], [1, 0.5], [5, 1], [10, 1], [14, 1], [15, 0], [16, 1], [30, 0]],
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }

            },

        ],

    },
    {
        type: 'gltf',
        name: 'pedestrians',
        url: '/sceneModels/people/pedestrains.glb',
        skeleton_enable: true,
        enable: true,
        instances: [
            {
                position: [9.06, 0, 1.37],
                path: [[9.06, 0, 1.37], [9.06, 0, 1.37]],
                speed: [[0, 0], [10, 0],[30,0]],
                rotation: { x: 0, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 }

            },
            // {
            //     position: [9, 0, 3],
            //     path: [[9, 0, 3], [9, 0, 6], [11, 0, 6], [11, 0, 3]],
            //     rotation: { x: 0, y: 0, z: 0 },
            //     scale: { x: 1, y: 1, z: 1 }
            // },
            // {
            //     position: [16, 0, 3],
            //     path: [[16, 0, 3], [16, 0, 6], [18, 0, 6], [18, 0, 3]],
            //     rotation: { x: 0, y: 0, z: 0 },
            //     scale: { x: 1, y: 1, z: 1 }
            // },
            // {
            //     position: [23, 0, 3],
            //     path: [[23, 0, 3], [23, 0, 6], [25, 0, 6], [25, 0, 3]],
            //     rotation: { x: 0, y: 0, z: 0 },
            //     scale: { x: 1, y: 1, z: 1 }
            // },

        ],

    },
    {
        type: 'gltf',
        name: 'bicycle',
        url: '/sceneModels/bike/bicycle.glb',
        skeleton_enable: false,
        enable: true,
        instances: [
            {
                position: [20, 0, 0],
                path: [[20, 0, 0], [9, 0, 0], [-3, 0, 0]],
                speed: [[0, 5], [25, 5]],
                rotation: { x: 0, y: Math.PI / 2, z: 0 },
                scale: { x: 0.6, y: 0.6, z: 0.6 }
            },//正常行驶的车
            {
                position: [3, 0, -1],
                path: [[-3, 0, -1], [3, 0, -1], [5, 0, -3]],
                speed: [[0, 5], [25, 5]],
                rotation: { x: 0, y: -Math.PI / 2, z: 0 },
                scale: { x: 0.6, y: 0.6, z: 0.6 }
            },//突然插入的车
        ],
    },
    // 更多模型可以添加到这个数组
];

export default DYNAMIC_MODELS_DATA;