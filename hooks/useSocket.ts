"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

interface CustomWindow extends Window {
  socket_id?: string; // Define the new property and its type
}
// Type assertion to avoid type errors
declare const window: CustomWindow;

const socket = io(process.env.NEXT_PUBLIC_BE_BASE_URL as string, {
  transports: ["websocket", "polling", "flashsocket"],
});

const useSocket = () => {
  useEffect(() => {
    socket.on("CONNECTION_SUCCESSFULL", (id) => {
      window.socket_id = id;
    });
  }, []);

  return { socket };
};

export default useSocket;
