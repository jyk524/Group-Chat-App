// Create a file named index.js (or whatever you defined in the package.json), and start importing the needed modules: express, http, and socket.io.

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// After you are done importing the modules, the next step is serving the front-end code and make sure the Node.js is running and we can access it from our browser (in this case I will use port 8080).

app.get('/', function (req, res) {
    res.render('index.ejs');
});

io.sockets.on('connection', function (socket) {
    socket.on('username', function (username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function (username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function (message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

const server = http.listen(8080, function () {
    console.log('listening on *:8080');
});