function isNum(num) {
    if (typeof num === 'number') {
        return true
    } else {
        return false
    }
}
function add(x) {
    return function (y) {
        return x + y
    }
}