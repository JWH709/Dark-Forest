import React from 'react';
import axios from 'axios';
// import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
  // const socketRef = React.useRef<Socket | null>(null);
  const { id } = useParams();
  const [ lobbyInfo, setLobbyInfo ] = React.useState<Lobby | null>(null)
  //fixes OIDC error for now....:
  const navigate = useNavigate()

  React.useEffect(()=>{
    const endPoint = `${import.meta.env.VITE_URL}/get-lobby-info`
    axios.post(endPoint, {id}).then(res => {
      setLobbyInfo(res.data)
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[])

  return (
    <>
    <h1>lobby id: {id}</h1>
    <button onClick={()=>{
      navigate('/home')
    }}>Back to home</button>
    </>
  );
};

export default Lobby;
