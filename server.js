const server = require('http').createServer();
const io = require('socket.io')(server, { cors: true });

const PORT = 3000;

server.listen(PORT);
console.log(`Listening on port ${PORT}`);

// Track players in the room
let readyPlayerCount = 0;

// Identify connected players
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('ready', () => {
        console.log('Player ready:', socket.id);

        readyPlayerCount++;

        // When 2 players have connected. Start the game!
        if (readyPlayerCount === 2) {
            io.emit('startGame', socket.id);
        }
    });
});