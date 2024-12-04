
interface SunProps {
  color: "yellow" | "green" | "blue" | "red" | "purple"; // Allowed tints
  size: number; // Size of the sun
}

const Sun = ({ color, size }: SunProps) => {
  let emissiveColor = "yellow";

  switch (color) {
    case "yellow":
      emissiveColor = "#FFD700"; // Golden yellow
      break;
    case "green":
      emissiveColor = "#00FF00"; // Bright green
      break;
    case "blue":
      emissiveColor = "#1E90FF"; // Blue
      break;
    case "red":
      emissiveColor = "#FF6347"; // Red-orange
      break;
    case "purple":
      emissiveColor = "#8A2BE2"; // Purple
      break;
    default:
      emissiveColor = "#FFD700";
      break;
  }

  return (
    <group>
      {/* Sun as a glowing sphere */}
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          emissive={emissiveColor}
          emissiveIntensity={1.5}
          color="white"
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
};

export default Sun;


