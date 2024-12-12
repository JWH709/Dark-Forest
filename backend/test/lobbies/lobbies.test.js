const { getLobby, joinLobby, lobbies, findPlayerLobby, Lobby } = require('../../src/lobbies/lobbies') 
const { createSystems } = require('../../src/middleware/beforeGameStart')
// Join Lobby:
describe('joinLobby', () => {
    it('if no lobbies exist, function should crash',()=>{
        expect(joinLobby).toThrow(TypeError)
    })
})
// Get Lobby:
describe('getLobby', () => {
  beforeEach(() => {
    lobbies.length = 0;
  });

  it('should create a new lobby if no lobbies exist', () => {
    const lobby = getLobby();

    expect(lobbies.length).toBe(1);

    expect(lobby.id).toBeGreaterThan(0);
    expect(lobby.isActive).toBe(true);
    expect(lobby.isFull).toBe(false);
    expect(lobby.isInGame).toBe(false);
    expect(lobby.players).toEqual([]);

    expect(lobby.systems.length).toBe(12);
    const uniqueSystems = new Set(lobby.systems);
    expect(uniqueSystems.size).toBe(lobby.systems.length);

    lobby.systems.forEach(system => {
      const [x, y] = system.split('-').map(Number);
      expect(Number.isInteger(x)).toBe(true);
      expect(Number.isInteger(y)).toBe(true);
      expect(x >= 0 && x <= 7).toBe(true);
      expect(y >= 0 && y <= 7).toBe(true);
    });
  });

  it('should return an available lobby if one exists that is active and not full', () => {
    const existingLobby = new Lobby(1, true, false, false, [], createSystems());
    lobbies.push(existingLobby);

    const lobby = getLobby();

    expect(lobby).toBe(existingLobby);
  });

  it('should create a new lobby if no active, available lobbies exist', () => {
    const existingLobby = new Lobby(1, true, true, false, [], createSystems());
    lobbies.push(existingLobby);

    const lobby = getLobby();

    expect(lobby.id).not.toBe(existingLobby.id);
    expect(lobbies.length).toBe(2);
  });
});
// Find Player Lobby:
describe('findPlayerLobby', () => {

    it('should return the correct lobby info if the player is found', () => {
      const mockPlayerId = 123;
      const mockLobby = {
        id: 1,
        isActive: true,
        isFull: false,
        isInGame: false,
        players: [{ id: mockPlayerId, name: 'Player1', system: 'PC' }]
      };
  
      lobbies.push(mockLobby);
  
      const result = findPlayerLobby(mockPlayerId);
  
      expect(result).toEqual({ status: true, gameId: 1 });
    });
  
    it('should return status false and gameId null if the player is not found', () => {
      const mockPlayerId = 999;
      const mockLobby1 = {
        id: 1,
        isActive: true,
        isFull: false,
        isInGame: false,
        players: [{ id: 111, name: 'Player1', system: 'PC' }]
      };
  
      const mockLobby2 = {
        id: 2,
        isActive: true,
        isFull: false,
        isInGame: false,
        players: [{ id: 222, name: 'Player2', system: 'PC' }]
      };
  
      lobbies.push(mockLobby1, mockLobby2);
  
      const result = findPlayerLobby(mockPlayerId);
  
      expect(result).toEqual({ status: false, gameId: null });
    });
  
    it('should return status false and gameId null if there are no active lobbies', () => {
      lobbies.length = 0;
  
      const result = findPlayerLobby(123);
  
      expect(result).toEqual({ status: false, gameId: null });
    });
  });