import React from 'react';
import { Line } from '@react-three/drei';
import { Plane } from '@react-three/drei';

interface GameSquareProps {
  position: [number, number, number]; // Position in the 3D space
  size: number; // Size of the square
  children?: React.ReactNode; // Optional content inside the square
  name: string
}

const GameSquare = ({ position, size, children, name }: GameSquareProps) => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const halfSize = size / 2;

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
            console.log(name)
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
