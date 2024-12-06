const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv'); 
const { getLobby, joinLobby, lobbies } = require('./src/lobbies/lobbies');
const { connection } = require('./src/db/connection');

dotenv.config();

const app = express();

// Lobby
app.get('/get-lobby/', (req, res) => {
    const lobby = getLobby();
    res.json(lobby);
});

app.post('/join-lobby/', (req, res) => {
    joinLobby(req.body.id, req.body.player);
    res.json('Added player to lobby');
});

// Start Server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
