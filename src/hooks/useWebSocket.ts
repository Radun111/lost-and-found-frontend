import { useEffect } from 'react';

export const useWebSocket = (url: string, onMessage: (data: any) => void) => {
  useEffect(() => {
    const socket = new WebSocket(url);
    socket.onmessage = (e) => onMessage(JSON.parse(e.data));
    return () => socket.close();
  }, [url, onMessage]);
};