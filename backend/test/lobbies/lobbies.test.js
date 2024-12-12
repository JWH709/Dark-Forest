const { getLobby, joinLobby, lobbies, findPlayerLobby } = require('../../src/lobbies/lobbies') 
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
        expect(lobby).toEqual(lobbies[0]);
        expect(lobby.isActive).toBe(true);
        expect(lobby.isFull).toBe(false);
        expect(lobby.isInGame).toBe(false);
        expect(lobby.players).toEqual([]);
    });

    it('should return an existing available lobby if one exists', () => {
        const lobby1 = getLobby(); 
        const lobby2 = getLobby(); 

        expect(lobbies.length).toBe(1); 
        expect(lobby2).toEqual(lobby1); 
    });

    it('should create a new lobby if no available lobbies exist', () => {
        const lobby1 = getLobby();
        lobby1.isFull = true; 

        const lobby2 = getLobby(); 

        expect(lobbies.length).toBe(2); 
        expect(lobby2).not.toEqual(lobby1); 
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