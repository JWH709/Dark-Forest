import Sun from "./Sun";
import Planet from "./Planet";

interface SystemProps {
  sunColor: "yellow" | "green" | "blue" | "red" | "purple"; // Sun color
  sunSize: number; // Size of the sun
  numPlanets: number; // Number of planets
  squareSize: number; // Size of the GameSquare
}

const System = ({ sunColor, numPlanets, squareSize }: SystemProps) => {
  const randomAngle = () => Math.random() * 2 * Math.PI;

  // Calculate maximum orbit radius (should fit inside the GameSquare)
  const maxOrbitRadius = (squareSize - 2) / 2;

  // Generate planets with random properties, keeping their orbits within maxOrbitRadius
  const planets = Array.from({ length: numPlanets }, (_, i) => ({
    orbitRadius: Math.random() * maxOrbitRadius, // Ensures orbit stays within bounds
    tilt: Math.random() * 0.5, // Random tilt
    orbitalSpeed: Math.random() * 0.001 + 0.0005, // Random speed
    size: Math.random() * 1 + 0.5, // Random size
    color: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff1493"][Math.floor(Math.random() * 5)], // Random color for planet
    initialAngle: randomAngle(),
    name: `Planet ${i + 1}`,
  }));

  return (
    <group>
      {/* Sun */}
      <Sun color={sunColor} size={1.0} />

      {/* Planets */}
      {planets.map((planet, index) => (
        <Planet
          key={index}
          initialAngle={planet.initialAngle}
          tilt={planet.tilt}
          orbitRadius={planet.orbitRadius}
          orbitalSpeed={planet.orbitalSpeed}
          args={[0.5, 32, 32]}
          color={planet.color}
        />
      ))}
    </group>
  );
};

export default System;
