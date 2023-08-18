const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('request_data', () => {
        setInterval(() => {
            const lat = 43.70 + Math.random() * 0.02 - 0.01;
            const lon = -79.42 + Math.random() * 0.02 - 0.01;
            const altitude = 1000 + Math.random() * 200;
            
            socket.emit('update_position', { lat, lon, altitude });
        }, 1000);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
