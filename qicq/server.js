const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const IO = require('socket.io');
const app = express();
const server = require('http').Server(app);

app.set('view-engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/', express.static(path.join(__dirname, 'public')));


const io = IO.listen(server);
const list = [];

io.on('connection',function (socket) {

    socket.on('room',function (user) {
        list.push({
            id: socket.id,
            user: user
        });
        console.log('当前在线：', list.length)
        socket.broadcast.emit('room', user.user)
    });

    socket.on('data',function (user) {
        socket.emit('data', 'hello word')
    });

});

app.get('/', function (req, res) {
    res.render(path.resolve('index.html'), {
        title: 'RoomNumber'
    })
});

app.get('/room/*', function (req, res) {
    res.render(path.resolve('room.html'), {
        title: 'ROOM'
    })
});

server.listen(8888, function () {
    console.log('http://127.0.0.1:8888')
});