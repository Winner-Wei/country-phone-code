const throttle = (fn, wait = 0) => {
    let lastTime = null
    return function () {
        let curTime = new Date()
        // 距离下次触发fn还需等待的时间(如果没有lastTime说明是第一次，可以表示执行，即等待时间为0
        let remainTime = lastTime ? wait - (curTime - lastTime) : 0
        if (remainTime <= 0 || remainTime > wait) {
            lastTime = curTime
            return fn.apply(this, arguments)
        }
    }
}

module.exports = {
    throttle
}