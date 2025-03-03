// Create src/utils/socket.ts
import  io  from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL;
export const socket = io(SOCKET_URL, {
  autoConnect: false
});