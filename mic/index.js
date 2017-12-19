let fs = require('fs');
let path = require('path');
//语音识别 + 合成
let AipSpeechClient = require('baidu-aip-sdk').speech;
//人脸
let AipSpeechClient = require('baidu-aip-sdk').face;


let APP_ID = "10231600";
let API_KEY = "uRCVMhuhfoIBifbbYPICr1d1";
let SECRET_KEY = "HYStrZOK2Lsy2eF0OCuPsWoFCtODPYpM";

let client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

/*    client.text2audio('语音测试', {per: 0})
    .then(function (result) {
        fs.writeFileSync(path.resolve('./music/demo.pcm'), result.data)
    });*/
/*data = fs.readFileSync('./music/8k.wav');
voiceBuffer = new Buffer(data);

client.recognize(voiceBuffer, 'wav', 8000).then(function (result) {
    console.log('<recognize>: ' + JSON.stringify(result));
}, function(err) {
    console.log(err);
});*/

data = fs.readFileSync('./music/2.jpg');
voiceBuffer = new Buffer(data);
// client.