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
        const newLobby = new Lobby(lobbies.length + 1, true, false, false, []);
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

module.exports = { getLobby, joinLobby, lobbies }