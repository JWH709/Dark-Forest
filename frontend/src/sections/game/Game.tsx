import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useParams } from 'react-router-dom';
import GameGrid from "./GameGrid";
import SkyBox from "./SkyBox";
import socket from "../../configs/socket";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface System {
    location: string;
    owner: string;
}
interface Player {
    id: string;
    name: string;
    system: System;
}
interface Lobby {
    id: number;
    isActive: boolean;
    isFull: boolean;
    isInGame: boolean;
    players: Player[];
    systems: System[];
}

const Game = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [gameInfo, setGameInfo] = React.useState<Lobby | null>(null)

    React.useEffect(() => {
        if (id) {
            socket.emit('get_lobby', { id });
    
            const syncLobbyHandler = (data: Lobby) => {
                setGameInfo(data);
                setIsLoading(true);
                console.log(data)
            };
    
            socket.on('sync_lobby', syncLobbyHandler);
    
            return () => {
                socket.off('sync_lobby', syncLobbyHandler);
            };
        }
    }, [id]);

    return (
        <>
        {isLoading &&
        <Canvas>
            <SkyBox />
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <OrbitControls />
            <GameGrid systems={gameInfo?.systems}/>
        </Canvas>}
        {!isLoading &&
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
        </Box>
        }
        </>
    )
}

export default Game