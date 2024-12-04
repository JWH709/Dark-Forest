const { getLobby, joinLobby } = require('../../src/lobbies/lobbies') 

describe('joinLobby', () => {
    it('if no lobbies exist, function should crash',()=>{
        expect(joinLobby).toThrow(TypeError)
    })
})