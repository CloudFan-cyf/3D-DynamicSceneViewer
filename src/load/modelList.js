// This file is used to store the data of all models in the scene.
// modelsData.js
const MODELS_DATA = [
    {
        type: 'gltf',
        name: 'tree',
        url: '/sceneModels/gltfTree/mytree.gltf',
        enable: true,
        instances: [
            { position: { x: 0, y: 0, z: 0 }, rotation: { x: Math.PI * -.5, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
            { position: { x: -5.1, y: 0, z: 7.46 }, rotation: { x: Math.PI * -.5, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } }
        ],
        
    },
    {
        type: 'gltf',
        name: 'bicycle',
        url: '/sceneModels/bike/bike.gltf',
        enable: true,
        instances: [
            { position: { x: 15, y: 0, z: 0 }, rotation: { x: Math.PI * -.5, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
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
        name: 'grass',
        url: '/sceneModels/tree.obj',
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
        type: 'complex_obj',
        name: 'bicycle',
        url: '/sceneModels/bike/bikered.obj',
        enable: true,
        instances: [
            {
                position: { x: 15, y: 0, z: 0 },
                rotation: { x: Math.PI * -.5, y: 0, z: 0 },
                scale: { x: 1, y: 1, z: 1 },
            },
        ],
        
    },
    // 更多模型可以添加到这个数组
];

export default MODELS_DATA;