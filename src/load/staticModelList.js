// This file is used to store the data of all models in the scene.
// modelsData.js
const MODELS_DATA = [
    {
        type: 'gltf',
        name: 'tree',
        url: '/sceneModels/gltfTree/mytree_1.gltf',
        enable: true,
        instances: [
            { position: { x: -5.1, y: 0, z: 7.46 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
            { position: { x: 9, y: 0, z: 3 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
            { position: { x: 16, y: 0, z: 3 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
            { position: { x: 23, y: 0, z: 3 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },

        ],
        
    },
    
    {
        type: 'gltf',
        name: 'people',
        url: '/sceneModels/people/people.gltf',
        enable: false,
        instances: [
            { position: { x: 7, y: 0, z: 2.6 }, rotation: { x: 0, y: Math.PI, z: 0 }, scale: { x: 1, y: 1, z: 1 } },//盲人用户
            { position: { x: 0, y: 0, z: -5 }, rotation: { x: 0, y: Math.PI/2, z: 0 }, scale: { x: 1, y: 1, z: 1 } },//直行行人
            { position: { x: 9, y: 0, z: -2.4 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },//对侧行人
        ],
        
    },
    {
        type: 'gltf',
        name: 'lamp',
        url: '/sceneModels/lamp/lamp.gltf',
        enable: true,
        instances: [
            { position: { x: -3, y: 0, z: -2.7 }, rotation: { x: 0, y: -Math.PI/2, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
            { position: { x: 22.5, y: 0, z: -2.7 }, rotation: { x: 0, y: -Math.PI/2, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
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