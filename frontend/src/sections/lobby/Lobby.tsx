import React from 'react';
import socket from '../../configs/socket';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
import '../../styles/lobby.css'
//MatUI:
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';


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

const Lobby = () => {
    const auth = useAuth() //The user
    const { id } = useParams();
    const [lobbyInfo, setLobbyInfo] = React.useState<Lobby | null>(null);
    const navigate = useNavigate();

    // Get Lobby info with websocket:
    React.useEffect(() => {
        if (id) {
            socket.emit('get_lobby', { id });
    
            const syncLobbyHandler = (data: Lobby) => {
                setLobbyInfo(data);
            };
    
            socket.on('sync_lobby', syncLobbyHandler);
    
            return () => {
                socket.off('sync_lobby', syncLobbyHandler);
            };
        }
    }, [id]);
    
    
    return (
            <div className='lobby-wrapper'>
                <div className='lobby-list-wrapper'>
                    {lobbyInfo?.players.map((player)=> {
                        return (
                        <div className='lobby-list-item' key={`${lobbyInfo.id} ${player.name}`}>
                            <AccountCircleRoundedIcon />
                            <h1 className='username'>{player.name}</h1>
                            {player.id == auth.user?.profile.sub &&
                                <IconButton aria-label="delete">
                                    <LogoutIcon />
                                </IconButton>
                            }
                        </div>
                        )
                    })
                    }
                </div>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() => navigate('/home')}>Back to Home</Button>
                </Stack>
            </div>
    );
};

export default Lobby;