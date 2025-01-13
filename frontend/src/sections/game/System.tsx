/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Sun from "./Sun";
import Planet from "./Planet";
import { useAuth } from "react-oidc-context";

interface SystemProps {
  sunColor: "yellow" | "green" | "blue" | "red" | "purple"; // Sun color
  sunSize: number; // Size of the sun
  numPlanets: number; // Number of planets
  squareSize: number; // Size of the GameSquare
  systemInfo: System
}

interface System {
  location: string;
  owner: string;
}

const SystemComponent = ({ sunColor, numPlanets, squareSize, systemInfo }: SystemProps) => {
  const auth = useAuth()
  console.log(auth)
  const [authLoaded, setAuthLoaded] = React.useState<boolean>(false)
  const [isUserSystem, setIsUserSystem] = React.useState<boolean>(false)
  const randomAngle = () => Math.random() * 2 * Math.PI;

  React.useEffect(()=>{
    if(auth) {
      setAuthLoaded(true)
    }
    if(authLoaded) {
      const userId = auth.user?.profile.sub
      console.log(systemInfo.owner)
      console.log(userId)
      if(userId == systemInfo.owner) {
        setIsUserSystem(true)
      }
    }

  },[setAuthLoaded, auth, authLoaded])
  

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
    <>
      {isUserSystem && (
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
      )}
    </>
  );
  
};

export default SystemComponent;
