var columnCount = 10;
//注意：onmessage因为是属性所以是小写的,postMessage因为是方法所以是大写的
onmessage = function(event) {
    var num = parseInt(event.data);
    var rowCount = num / columnCount;
    var lastColumnCount = num % columnCount;
    for(var j=0; j<rowCount; j++) {
        var thisColumnCount = rowCount-j < 1 ? lastColumnCount : columnCount;
        for(var i=0; i<thisColumnCount; i++) {
            //postMessage这里不需要将变量赋值给event,它会自动赋值
            postMessage({"i":i, "j":j});
        }
    }
}