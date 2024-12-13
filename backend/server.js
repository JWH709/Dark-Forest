const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv'); 
const { getLobby, joinLobby, lobbies, findPlayerLobby, getLobbyInfo } = require('./src/lobbies/lobbies');
const { connection } = require('./src/db/connection');
const { handleUserInfo } = require('./src/middleware/handleUserInfo')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Home
app.post('/user-info', (req, res) => {
    const user = req.body
    if(user && user != 'undefined') {
        handleUserInfo(user)
    }
})

// Lobby
app.post('/join-lobby/', (req, res) => {
    const lobby = getLobby();
    lobby.systems[lobby.players.length].owner = req.body.user.id
    const playerSystem = lobby.systems[lobby.players.length]
    const player = {id: req.body.user.id, name: req.body.user.username, system: playerSystem}
    joinLobby(lobby.id, player);
    res.json(lobby.id)
});

app.post('/check-in-game', (req, res) => {
    const playerId = req.body
    console.log(req.body.userId)
    const inGameStatus = findPlayerLobby(playerId)
    res.json(inGameStatus)
});

app.post('/get-lobby-info', (req, res) => {
    const lobby = getLobbyInfo(req.body.id)
    res.json(lobby)
})

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
