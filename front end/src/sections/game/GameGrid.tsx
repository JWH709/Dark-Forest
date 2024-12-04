import GameSquare from "./GameSquare";
import System from "./System";


const GameGrid = () => {
  const gridSize = 8;
  const squareSize = 30;

  const squares = [];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const x = col * squareSize - (gridSize * squareSize) / 2 + squareSize / 2;
      const z = row * squareSize - (gridSize * squareSize) / 2 + squareSize / 2;

      const hasSystem = Math.random() > 0.7;

      squares.push(
        <GameSquare key={`${row}-${col}`} position={[x, 0, z]} size={squareSize} name={`${row}-${col}`}>
          {hasSystem && (
            <System
              sunColor={["yellow", "green", "blue", "red", "purple"][Math.floor(Math.random() * 5)] as "yellow" | "green" | "blue" | "red" | "purple"}
              sunSize={3}
              numPlanets={Math.floor(Math.random() * 4) + 3} 
              squareSize={squareSize} 
            />
          )}
        </GameSquare>
      );
    }
  }

  return <>{squares}</>;
};

export default GameGrid;
