import * as THREE from 'three';
import { ExtrudeGeometry } from 'three';


// 地球半径，单位：米
const EARTH_RADIUS = 6371000;

// 场景原点的经纬度
const originLatitude = 40.178579; // 纬度
const originLongitude = 116.156975; // 经度

/**
 * 将经纬度坐标转换为three.js的XZ平面坐标
 * @param {number} longitude - 经度
 * @param {number} latitude - 纬度
 * @returns {THREE.Vector3} 返回three.js中的XZ平面坐标，Y坐标默认为0
 */
function convertLatLongToSceneCoordinates(longitude, latitude) {
    // 计算纬度和经度的变化量
    const deltaLatitude = latitude - originLatitude;
    const deltaLongitude = longitude - originLongitude;

    // 将纬度和经度变化量转换为场景中的距离
    const x = -deltaLatitude * (Math.PI / 180) * EARTH_RADIUS;
    const z = -deltaLongitude * (Math.PI / 180) * EARTH_RADIUS * Math.cos(latitude * Math.PI / 180);

    return new THREE.Vector3(x, 0, z);
}


// 创建材质
//const material = new THREE.MeshBasicMaterial({ color: 0xf2f2f2 });

// 加载并解析.geojson文件，创建Three.js几何体
function loadOSM(geojsonDataurl, centerLatitude, centerLongitude, scene,material) {
    // 使用fetch API异步加载.geojson文件
    fetch(geojsonDataurl)
        .then(response => response.json()) // 解析响应为JSON格式
        .then(geojsonData => {
            // 遍历.geojson文件中的所有feature
            geojsonData.features.forEach(feature => {
                // 只处理类型为'Polygon'的地理特征
                if (feature.geometry.type === 'Polygon') {
                    // 提取多边形顶点，转换为Three.js场景坐标
                    const vertices = feature.geometry.coordinates[0].map(coord => {
                        return convertLatLongToSceneCoordinates(coord[0], coord[1]);
                    });

                    // 创建一个新的THREE.Shape对象
                    const shape = new THREE.Shape();
                    // 遍历所有顶点以创建形状的路径
                    vertices.forEach((vert, index) => {
                        if (index === 0)
                            shape.moveTo(vert.x, vert.z); // 如果是第一个点，则移动到该点
                        else
                            shape.lineTo(vert.x, vert.z); // 否则，绘制线到该点
                    });

                    // 使用THREE.ExtrudeGeometry通过shape生成一个立体几何体，设置深度和斜面
                    const geometry = new ExtrudeGeometry(shape, { depth: 15, bevelEnabled: false });
                    // 通过几何体和材质创建一个mesh对象
                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;
                    mesh.rotation.x = Math.PI / 2; // 绕X轴旋转90度，使mesh朝向正确
                    mesh.position.y = mesh.position.y + 15; // 调整高度，使mesh底部与地面平行
                    //mesh.rotation.y = -Math.PI; // 绕Y轴旋转180度，使mesh朝向正确
                    // 将mesh添加到场景中
                    scene.add(mesh);
                }
            });
        })
        .then(() => console.log('GeoJSON data loaded and parsed successfully.')) // 处理成功的加载和解析
        .catch(error => console.error('Failed to load GeoJSON data:', error)); // 处理加载或解析过程中的错误
}


export default loadOSM;
