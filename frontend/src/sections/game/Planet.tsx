import { useRef, } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

interface PlanetProps {
  initialAngle: number;
  tilt: number;
  orbitRadius: number;
  orbitalSpeed: number;
  args: [number, number, number]; // args for the sphere (radius, widthSegments, heightSegments)
  color: string; // Planet color
}

const Planet = ({
  initialAngle,
  tilt,
  orbitRadius,
  orbitalSpeed,
  args,
  color,
}: PlanetProps) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(initialAngle);

  useFrame(() => {
    if (planetRef.current) {
      // Update the planet's angle based on orbital speed
      angleRef.current += orbitalSpeed;

      // Set the planet's position in orbit around the sun
      planetRef.current.position.x = orbitRadius * Math.cos(angleRef.current);
      planetRef.current.position.z = orbitRadius * Math.sin(angleRef.current);

      // Apply the tilt to the planet
      planetRef.current.rotation.y = tilt;
    }
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Planet;
