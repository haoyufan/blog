const express = require('express');
const ejs = require('ejs');
const path = require('path');
const IO = require('socket.io');
const app = express();
const server = require('http').Server(app);

app.set('view-engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/', express.static(path.join(__dirname, 'public')));


let io = IO.listen(server);

io.on('connection',function (socket) {

    socket.on('room',function (user) {
        console.log(socket.id, user)
    });

    socket.emit('room', 'hello word')
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