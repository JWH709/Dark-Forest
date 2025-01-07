import { io, Socket } from 'socket.io-client';

declare global {
    interface Window {
        socket?: Socket;
    }
}

const socket: Socket = window.socket || io(import.meta.env.VITE_URL);
if (process.env.NODE_ENV === 'development') {
    window.socket = socket; // Persist socket for hot reloads
}

export default socket;
