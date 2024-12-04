import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GameGrid from "./GameGrid";
import SkyBox from "./SkyBox";

const Game = () => {

    return (
        <>
        <Canvas>
            <SkyBox />
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <OrbitControls />
            <GameGrid />
        </Canvas>
        </>
    )
}

export default Game