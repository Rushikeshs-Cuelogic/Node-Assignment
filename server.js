var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
require('dotenv').config();

app.get('/', function(req, res) {
    res.sendfile('indexOne.html');
});
users = [];
io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('setUsername', function(data) {
        console.log(data);
        if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet', { username: data });
        }
    });
    socket.on('msg', function(data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })
});
http.listen(process.env.PORT, function() {
    console.log('listening on localhost:', process.env.PORT);
});
