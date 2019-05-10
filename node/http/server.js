const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer();
server.on('request', (req, res) => {
    let pathName = url.parse(req.url).pathname;
    console.log(`url:${pathName}`);
    console.log()
    res.write(fs.readFileSync(pathName.substr(1)));
    res.end();
})

server.listen(1000);
