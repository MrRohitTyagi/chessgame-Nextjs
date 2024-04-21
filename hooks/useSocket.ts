"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BE_BASE_URL as string, {
  transports: ["websocket", "polling", "flashsocket"],
});

const useSocket = () => {
  useEffect(() => {
    socket.on("CONNECTION_SUCCESSFULL", (id) => {});
  }, []);

  return { socket };
};

export default useSocket;
