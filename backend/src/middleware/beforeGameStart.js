const generateRandomSystem = (takenSystems) => {
    do {
      const x = Math.floor(Math.random() * 8);
      const y = Math.floor(Math.random() * 8);
      system = `${x}-${y}`;
    } while (takenSystems.includes(system));
    return system;
  };