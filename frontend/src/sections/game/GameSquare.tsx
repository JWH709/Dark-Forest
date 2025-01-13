import React from 'react';
import { Line } from '@react-three/drei';
import { Plane } from '@react-three/drei';
import { useAuth } from "react-oidc-context";

interface GameSquareProps {
  position: [number, number, number]; // Position in the 3D space
  size: number; // Size of the square
  children?: React.ReactNode; // Optional content inside the square
  name: string
  hasSystem: boolean | System
}
interface System {
  location: string;
  owner: string;
}

const GameSquare = ({ position, size, children, hasSystem }: GameSquareProps) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const halfSize = size / 2;
  const auth = useAuth()

  // Define the vertices for the border
  const points: readonly [number, number, number][] = [
    [-halfSize, 0, -halfSize],
    [halfSize, 0, -halfSize],
    [halfSize, 0, halfSize],
    [-halfSize, 0, halfSize],
    [-halfSize, 0, -halfSize],
  ];

  return (
    <group position={position}>
      <Plane
        args={[size, size]} // Match the square size
        rotation={[-Math.PI / 2, 0, 0]} // Rotate to lay flat on the XZ plane
        position={[0, 0.01, 0]} // Slightly above the ground to avoid z-fighting
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        visible={false} // Invisible but still detects pointer events
        onClick={()=> {
            if(hasSystem) {
              if(auth.user?.profile.sub != hasSystem?.owner) {
                console.log('you win I guess')
              } else if(auth.user?.profile.sub == hasSystem?.owner) {
                console.log('thats ur system')
              }
            } else {
              console.log('guess again')
            }
            /* Call the server if it's you're turn and guess a square */
        }}
      />
      
      {/* Border */}
      <Line points={points} color={isHovered ? 'yellow' : 'white'} lineWidth={1} />

      {/* Content localized within the square */}
      <group position={[0, 0, 0]}>
        {children}
      </group>
    </group>
  );
};

export default GameSquare;
