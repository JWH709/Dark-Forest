import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
// import axios from 'axios';
// import { io, Socket } from 'socket.io-client';

type Player = {
  id: number;
  name: string;
  system: string;
};

type Lobby = {
  id: number;
  isActive: boolean;
  isFull: boolean;
  isInGame: boolean;
  players: [];
};

const generateRandomSystem = (takenSystems: string[]): string => {
  let system: string;
  do {
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);
    system = `${x}-${y}`;
  } while (takenSystems.includes(system));
  return system;
};


const Lobby = () => {
  const location = useLocation();
  const lobby: Lobby = location.state?.lobby
  const userPlayer: Player = { id: 0, name: 'beet', system: generateRandomSystem([]) };
  // const socketRef = React.useRef<Socket | null>(null);


  const [players, setPlayers] = React.useState<Player[]>([userPlayer]);
  const [startGame, setStartGame] = React.useState<boolean>(false);
  
  const takenSystems = players.map(player => player.system);

  const addBot = () => {
    if (players.length < 12) {
      const newBot: Player = {
        id: players.length,
        name: `Bot ${players.length}`,
        system: generateRandomSystem(takenSystems),
      };
      setPlayers(prevPlayers => [...prevPlayers, newBot]);
      console.log(players)
    }
  }; //ToDo: This is for testing an can be removed before creating the game.

  const startGameHandler = () => {
    if (players.length === 12) {
      setStartGame(true);
    } else {
      console.log('Not enough players to start game!');
    }
  }; //ToDo: on backend hookup, I remove the need for a button and start a game once the lobby is filled 

  return (
    <>
      <div>
        {players.map((item) => (
          <Stack direction="row" spacing={1} key={item.id}>
            <Chip icon={<FaceIcon />} label={item.name} variant="outlined" />
          </Stack>
        ))}
      </div>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={addBot}>
          ADD BOT
        </Button>
        <Button variant="contained" onClick={startGameHandler}>
          START GAME
        </Button>
        <Button variant='contained' onClick={()=>{
          console.log(lobby)
        }}>Check Lobby</Button>
      </Stack>
      {startGame && <Navigate to='/game' />}
    </>
  );
};

export default Lobby;
