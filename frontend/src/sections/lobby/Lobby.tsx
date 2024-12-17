import React from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
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

const socket: Socket = io.connect(import.meta.env.VITE_URL)

const Lobby = () => {
    const auth = useAuth() //The user
    const { id } = useParams();
    socket.emit('get_lobby', {id: id})
    const [lobbyInfo, setLobbyInfo] = React.useState<Lobby | null>(null);
    const navigate = useNavigate();

    // Get Lobby info with websocket:
    React.useEffect(()=>{
        socket.on('sync_lobby', (data) => {
            setLobbyInfo(data)
        })
    },[])

    return (
            <div className='lobby-wrapper'>
                <div className='lobby-list-wrapper'>
                    {lobbyInfo?.players.map((player)=> { //ToDo: on inital render, this is null, need to add a check to re-render once lobbyInfo isn't null
                        return (
                        <div className='lobby-list-item'>
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
