io.on('connection', (socket) => {
    console.log('a socket user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});