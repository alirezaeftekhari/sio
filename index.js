const app = require('express')();
app.use(require('express').static('public'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);

var clients = [];
io.on('connection', (socket) => {
    console.log(socket.id + ' connected');
    clients.push(socket.id);
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
        let index = clients.indexOf(socket.id);
        if(index != -1) {
            clients.splice(index, 1);
        }

    });

    socket.on('len', () => {
        console.log(`-----------------${clients.length} -------------------`);
    })
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});