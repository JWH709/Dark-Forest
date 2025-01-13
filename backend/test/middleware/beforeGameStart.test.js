const { createSystems, createGameState, shuffleArray, Game } = require('../../src/middleware/beforeGameStart')

describe('shuffleArray', () => {
  it('should shuffle the array and return the same length', () => {
    const inputArray = ['a', 'b', 'c', 'd', 'e'];
    const shuffledArray = shuffleArray(inputArray);
    expect(shuffledArray.length).toBe(inputArray.length);
    expect(shuffledArray.sort()).toEqual(inputArray.sort());
  });

  it('should shuffle the array (order should change)', () => {
    const inputArray = ['a', 'b', 'c', 'd', 'e'];
    let firstShuffle = shuffleArray([...inputArray]);
    let secondShuffle = shuffleArray([...inputArray]);
    let thirdShuffle = shuffleArray([...inputArray]);
    expect(firstShuffle).not.toEqual(secondShuffle);
    expect(secondShuffle).not.toEqual(thirdShuffle);
    expect(firstShuffle).not.toEqual(thirdShuffle);
  });

  it('should not modify the original array', () => {
    const inputArray = ['a', 'b', 'c', 'd', 'e'];
    const originalArray = [...inputArray];
    shuffleArray(inputArray);
    expect(inputArray).toEqual(originalArray);
  });
});

describe('createSystems', () => {
    it('should generate 12 unique systems', () => {
      const systems = createSystems();
  
      expect(systems.length).toBe(12);
  
      const uniqueSystems = new Set(systems);
      expect(uniqueSystems.size).toBe(systems.length);
  
      systems.forEach(system => {
        const [x, y] = system.location.split('-').map(Number);
        expect(Number.isInteger(x)).toBe(true);
        expect(Number.isInteger(y)).toBe(true);
        expect(x >= 0 && x <= 7).toBe(true);
        expect(y >= 0 && y <= 7).toBe(true);
        expect(system.owner == null).toBe(true)
      });
    });
  });