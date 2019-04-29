/**
 * Author: silence
 * Create Time: 2018-08-08 22:55
 * Description:
 */

function rad(d) {
    return d * Math.PI / 180.0;
}
function GetAzimuth(lo1,la1,lo2,la2) {
    let lat1 = rad(la1);
    let lat2 = rad(la2);
    let lon1 = rad(lo1);
    let lon2 = rad(lo2);
    let azimuth = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    azimuth = Math.sqrt(1 - azimuth * azimuth);
    azimuth = Math.cos(lat2) * Math.sin(lon2 - lon1) / azimuth;
    azimuth = Math.asin(azimuth) * 180 / Math.PI;
    if (azimuth) {
        if (lon1 < lon2) {
            azimuth = 90.0;
        } else {
            azimuth = 270.0;
        }
    }
    return azimuth;
}
// console.log(GetAzimuth(112.9833758116, 27.9167577889, 118.8720722454, 31.8402459759))

function calcAngle(start, end) {
    var diff_x = end[0] - start[0],
        diff_y = end[1] - start[1];
    return 360*Math.atan2(diff_y, diff_x)/(2*Math.PI);
}

console.log(calcAngle([117.2021459819, 39.0362553043], [116.4770701267, 39.8254279513]))
var PI = Math.PI;
var EARTH_RADIUS = 6378137.0;
function getRad(d){

    return d*PI/180.0;

}
// function getFlatternDistance(lat1,lng1,lat2,lng2){
//
//     var f = getRad((lat1 + lat2)/2);
//
//     var g = getRad((lat1 - lat2)/2);
//
//     var l = getRad((lng1 - lng2)/2);
//
//
//
//     var sg = Math.sin(g);
//
//     var sl = Math.sin(l);
//
//     var sf = Math.sin(f);
//
//
//
//     var s,c,w,r,d,h1,h2;
//
//     var a = EARTH_RADIUS;
//
//     var fl = 1/298.257;
//
//
//
//     sg = sg*sg;
//
//     sl = sl*sl;
//
//     sf = sf*sf;
//
//
//
//     s = sg*(1-sl) + (1-sf)*sl;
//
//     c = (1-sg)*(1-sl) + sf*sl;
//
//
//
//     w = Math.atan(Math.sqrt(s/c));
//
//     r = Math.sqrt(s*c)/w;
//
//     d = 2*w*a;
//
//     h1 = (3*r -1)/2/c;
//
//     h2 = (3*r +1)/2/s;
//
//
//
//     return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
//
// }
function getGreatCircleDistance(lat1,lng1,lat2,lng2){

    var radLat1 = getRad(lat1);

    var radLat2 = getRad(lat2);



    var a = radLat1 - radLat2;

    var b = getRad(lng1) - getRad(lng2);



    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));

    s = s*EARTH_RADIUS;

    s = Math.round(s*10000)/10000.0;



    return s;

}

// console.log(getGreatCircleDistance(112.9833758116, 27.9167577889, 118.8720722454, 31.8402459759))
// console.log(getGreatCircleDistance(112.9833758116, 27.9167577889, 116.4770701267, 39.8254279513))