class TimeManager {
    constructor() {
        if (TimeManager.instance) {
            return TimeManager.instance;
        }
        this.currentTime = 0;
        this.lastUpdateTime = 0;
        TimeManager.instance = this;
    }

    update(time) {
        this.lastUpdateTime = this.currentTime;
        this.currentTime = time;
        return (this.currentTime - this.lastUpdateTime) / 1000; // 返回以秒为单位的deltaTime
    }

    static getInstance() {
        if (!TimeManager.instance) {
            TimeManager.instance = new TimeManager();
        }
        return TimeManager.instance;
    }
}

export default TimeManager.getInstance();
