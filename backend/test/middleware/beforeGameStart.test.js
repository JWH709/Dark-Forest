const { createSystems } = require('../../src/middleware/beforeGameStart')

describe('createSystems', () => {
    it('should generate 12 unique systems', () => {
      const systems = createSystems();
  
      expect(systems.length).toBe(12);
  
      const uniqueSystems = new Set(systems);
      expect(uniqueSystems.size).toBe(systems.length);
  
      systems.forEach(system => {
        const [x, y] = system.split('-').map(Number);
        expect(Number.isInteger(x)).toBe(true);
        expect(Number.isInteger(y)).toBe(true);
        expect(x >= 0 && x <= 7).toBe(true);
        expect(y >= 0 && y <= 7).toBe(true);
      });
    });
  });
  