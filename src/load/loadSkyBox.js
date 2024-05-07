import * as THREE from 'three';

async function loadSkyBox(skyBoxUrl, scene) {
    const loader = new THREE.TextureLoader();

    // 使用Promise确保纹理加载完成后再执行后续操作
    const texture = await new Promise((resolve, reject) => {
        loader.load(skyBoxUrl,
            (loadedTexture) => {
                loadedTexture.mapping = THREE.EquirectangularReflectionMapping;
                
                console.log('Texture loaded successfully:', skyBoxUrl);
                resolve(loadedTexture);
            },
            undefined, // 进度处理函数，通常不必要
            (error) => {
                reject(error);
            });
    });

    // 将加载完成的纹理设置为场景的背景
    texture.colorSpace = THREE.SRGBColorSpace;
    scene.background = texture;
}

export default loadSkyBox;
