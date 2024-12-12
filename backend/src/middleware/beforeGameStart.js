const createSystems = () => {
  let systems = [];
  do {
    let x = Math.floor(Math.random() * 8);
    let y = Math.floor(Math.random() * 8);
    let system = `${x}-${y}`;
    let existingSystem = systems.find((s) => s === system);
    if (existingSystem === undefined) {
      systems.push(system);
    }
  } while (systems.length < 12);

  return systems;
};

module.exports = { createSystems }