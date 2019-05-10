/**
 * Author: silence
 * Create Time: 2018-08-06 10:25
 * Description:
 */

const http = require('http');

const option = {
    host: 'localhost',
    port: 1000,
    path: '/index.html',
};

let callback = (res) => {
    console.log(`code status: ${res.statusCode}`)
    let body = '';

    res.on('data', data => {
        console.log(data)
    });

    res.on('end', () => {
        console.log(body)
    });
};

let req = http.request(option, callback);
req.end();