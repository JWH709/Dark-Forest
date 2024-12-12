const lobbies = []

function Lobby(id, isActive, isFull, isInGame, players) {
    this.id = id;
    this.isActive = isActive;
    this.isFull = isFull;
    this.isInGame = isInGame;
    this.players = players;
}

const getLobby = () => {

    const createNewLobby = () => {
        const lobbyId = new Date().getTime()
        const newLobby = new Lobby(lobbyId, true, false, false, []);
        lobbies.push(newLobby);
        return newLobby;
    };

    if (lobbies.length < 1) {
        return createNewLobby();
    }

    const availableLobby = lobbies.find(lobby => lobby.isActive && !lobby.isFull);

    return availableLobby || createNewLobby();
};

const joinLobby = (lobbyId, player) => {
    const lobby = lobbies.find(lobby => lobby.id == lobbyId)
    lobby.players.push(player)
};

const findPlayerLobby = (playerId) => {
    const activeLobbies = lobbies.filter(lobby => lobby.isActive);
    for (let i = 0; i < activeLobbies.length; i++) {
        const player = activeLobbies[i].players.find(player => player.id === playerId);
        if (player) {
            return {status: true, gameId: activeLobbies[i].id};
        }
    }
    return {status: false, gameId: null};
}

module.exports = { getLobby, joinLobby, lobbies, findPlayerLobby }