export function throttle(fn, interval) {
  var __self = fn,
    timer,
    firstTime = true
  return function() {
    var args = arguments,
      __me = this
    if (firstTime) {
      __self.apply(__me, args)
      return firstTime = false
    }
    if (timer) {
      return false
    }
    timer = setTimeout(function() {
      clearTimeout(timer) // 清除之前的定时器
      timer = null
      __self.apply(__me, args)
    }, interval || 500)
  }
}
