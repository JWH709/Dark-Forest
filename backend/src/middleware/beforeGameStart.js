function Game(id, systems, turnOrder, playerInfo, turnNumber) {
  this.id = id;
  this.systems = systems;
  this.turnOrder = turnOrder;
  this.playerInfo = playerInfo;
  this.turnNumber = turnNumber;
}

function shuffleArray(array) {
  const copiedArray = [...array];
  
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
}

const createSystems = () => {
  let systems = [];
  do {
    let x = Math.floor(Math.random() * 8);
    let y = Math.floor(Math.random() * 8);
    let system = {location: `${x}-${y}`, owner: null};
    let existingSystem = systems.find((s) => s.location === system.location);
    if (existingSystem === undefined) {
      systems.push(system);
    }
  } while (systems.length < 12);

  return systems;
};

const createGameState = (lobbyInfo) => {
  const shuffledArray = shuffleArray(lobbyInfo.players)
  const getTurnOrder = (players) => {
    let turnOrder = []
    for(let x = 0; x < players.length; x++) {
      turnOrder.push({id: players.id, turnOrder: x})
    }
    return turnOrder
  }

  const turnOrder = getTurnOrder(shuffledArray)

  const game = new Game(lobbyInfo.id, lobbyInfo.systems, turnOrder, lobbyInfo.players, 1)

  return game
}

module.exports = { createSystems, createGameState, shuffleArray, Game }