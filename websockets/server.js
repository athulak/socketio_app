let io = require('socket.io') (5000),
    sockets = [];

io.on('connection', function (socket) {
    console.log(`Socket ${socket.id} connected!`);
    sockets.push(socket);
    socket.on('message', function (message) {
        for (let i = 0; i < sockets.length; i++)
        {
            sockets[i].send(message);
        }
    });
    socket.on('disconnect', function () {
        for (let i=0; i < sockets.length; i++)
        {
            if(sockets[i].id === socket.id)
            {
                sockets.splice(i, 1);
                console.log(`Socket ${socket.id} disconnected!`);
            }
        }
    });
});