import GameSquare from "./GameSquare";
import SystemComponent from "./System";

interface GameGridProps {
  systems: System[] | undefined
}

interface System {
  location: string;
  owner: string;
}


const GameGrid = ({ systems }: GameGridProps) => {
  const gridSize = 8;
  const squareSize = 30;

  const squares = [];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * squareSize - (gridSize * squareSize) / 2 + squareSize / 2;
      const z = row * squareSize - (gridSize * squareSize) / 2 + squareSize / 2;

      const checkSystem = (systems: System[]) => {
        const currentSystem: System = {location: `${row}-${col}`, owner: 'none'}
        const targetSystem = systems.find((s) => s.location === currentSystem.location)
        if(targetSystem != undefined) {
          return targetSystem
        } else {
          return false
        }
      }

      let hasSystem: boolean | System = false

      if(systems) {
        hasSystem = checkSystem(systems)
      }

      squares.push(
        <GameSquare key={`${row}-${col}`} position={[x, 0, z]} size={squareSize} name={`${row}-${col}`} hasSystem={hasSystem}>
          {hasSystem && (
            <SystemComponent
              sunColor={["yellow", "green", "blue", "red", "purple"][Math.floor(Math.random() * 5)] as "yellow" | "green" | "blue" | "red" | "purple"}
              sunSize={3}
              numPlanets={Math.floor(Math.random() * 4) + 3} 
              squareSize={squareSize} 
              systemInfo={hasSystem}
            />
          )}
        </GameSquare>
      );
    }
  }

  return <>{squares}</>;
};

export default GameGrid;
