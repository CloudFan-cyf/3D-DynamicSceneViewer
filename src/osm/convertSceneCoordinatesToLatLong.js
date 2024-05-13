// 地球半径，单位：米
const EARTH_RADIUS = 6371000;

// 场景原点的经纬度
const originLatitude = 40.178579; // 纬度
const originLongitude = 116.156975; // 经度

/**
 * 将场景中的 XZ 平面坐标转换为经纬度坐标
 * @param {number} x - 场景中的 X 坐标（实际南北）,正方向为南
 * @param {number} z - 场景中的 Z 坐标（实际东西），正方向为西
 * @returns {Object} 包含纬度和经度的对象
 */
function convertSceneCoordinatesToLatLong(x, z) {
    // 纬度变化
    const deltaLatitude = (x / EARTH_RADIUS) * (180 / Math.PI);
    // 经度变化
    const deltaLongitude = -(z / EARTH_RADIUS) * (180 / Math.PI) / Math.cos(originLatitude * Math.PI / 180);

    return {
        latitude: originLatitude + deltaLatitude,
        longitude: originLongitude + deltaLongitude
    };
}


export default convertSceneCoordinatesToLatLong;
