let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    // Only on the pong namespace the server repsonds the following
    pongNamespace.on('connection', (socket) => {

        // Keep room in scope
        let room;

        // Identify connected players
        console.log('a user connected:', socket.id);
    
        // Track players in the room
        socket.on('ready', () => {

            // Room creation
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            console.log('Player ready:', socket.id, room);
    
            readyPlayerCount++;
    
            // When 2 players have connected. Start the game!
            if (readyPlayerCount % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id);
            }
        });
    
        socket.on('paddleMove', (paddleData) => {
            // Send paddle position to the other player
            socket.to(room).emit('paddleMove', paddleData);
        });
    
        socket.on('ballMove', (ballData) => {
            // Send ball position and score to the other player
            socket.to(room).emit('ballMove', ballData)
        });
    
        // Detect disconnects
        socket.on('disconnect', (reason) => {
            console.log(`Client: ${socket.id} disconnected: ${reason}`);
            // Leave the room
            socket.leave(room);
        });
    });
}

module.exports = {
    listen,
}