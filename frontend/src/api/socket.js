// Frontend - Socket.IO Setup
import io from 'socket.io-client';

let socket = null;

export const setupSocket = () => {
  if (socket) return socket;

  socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
    auth: {
      token: localStorage.getItem('token'),
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('✅ WebSocket connected');
  });

  socket.on('disconnect', () => {
    console.log('❌ WebSocket disconnected');
  });

  socket.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });

  return socket;
};

export const getSocket = () => socket;

export const joinUserRoom = (userId) => {
  if (socket) {
    socket.emit('join-user', userId);
  }
};

export const leaveUserRoom = (userId) => {
  if (socket) {
    socket.emit('leave-user', userId);
  }
};
