let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    // Only on the pong namespace the server repsonds the following
    pongNamespace.on('connection', (socket) => {
        // Identify connected players
        console.log('a user connected:', socket.id);
    
        // Track players in the room
        socket.on('ready', () => {
            console.log('Player ready:', socket.id);
    
            readyPlayerCount++;
    
            // When 2 players have connected. Start the game!
            if (readyPlayerCount % 2 === 0) {
                pongNamespace.emit('startGame', socket.id);
            }
        });
    
        socket.on('paddleMove', (paddleData) => {
            // Send paddle position to the other player
            socket.broadcast.emit('paddleMove', paddleData);
        });
    
        socket.on('ballMove', (ballData) => {
            // Send ball position and score to the other player
            socket.broadcast.emit('ballMove', ballData)
        });
    
        // Detect disconnects
        socket.on('disconnect', (reason) => {
            console.log(`Client: ${socket.id} disconnected: ${reason}`);
        });
    });
}

module.exports = {
    listen,
}