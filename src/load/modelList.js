// This file is used to store the data of all models in the scene.
// modelsData.js
const MODELS_DATA = [
    {
        type: 'gltf',
        name: 'tree',
        url: '/sceneModels/gltfTree/mytree_1.gltf',
        enable: true,
        instances: [
            { position: { x: -5.1, y: 0, z: 7.46 }, rotation: { x: Math.PI * -.5, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } }
        ],
        
    },
    {
        type: 'gltf',
        name: 'bicycle',
        url: '/sceneModels/bike/bike.gltf',
        enable: true,
        instances: [
            { position: { x: 0, y: 0, z: 0 }, rotation: { x: Math.PI * -.5, y: Math.PI * -.5, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
        ],
    },
    {
        type: 'obj',
        name: 'roadForPeople',
        url: '/sceneModels/roadForPeople.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x:Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
        
    },
    {
        type: 'obj',
        name: 'roadForVehicles',
        url: '/sceneModels/roadForVehicles.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
    },
    {
        type: 'obj',
        name: 'roadSide',
        url: '/sceneModels/roadSide.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
    },
    {
        type: 'obj',
        name: 'grass',
        url: '/sceneModels/grass.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
    },
    {
        type: 'obj',
        name: 'stairs',
        url: '/sceneModels/stairs.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
    },
    {
        type: 'obj',
        name: 'barrier',
        url: '/sceneModels/barrier.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
    },
    {
        type: 'obj',
        name: 'roof',
        url: '/sceneModels/roof.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
    },
    {
        type: 'obj',
        name: 'concrete',
        url: '/sceneModels/concrete.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],

    },
    {
        type: 'obj',
        name: 'building',
        url: '/sceneModels/building.obj',
        enable: true,
        instances: [
            {
                position: { x: 0, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
    }
    // 更多模型可以添加到这个数组
];

export default MODELS_DATA;