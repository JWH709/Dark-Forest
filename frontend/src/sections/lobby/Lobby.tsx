// import axios from 'axios';
// import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const Lobby = () => {
  // const socketRef = React.useRef<Socket | null>(null);
  const { id } = useParams();

  return (
    <>
    <h1>lobby id: {id}</h1>
    </>
  );
};

export default Lobby;
