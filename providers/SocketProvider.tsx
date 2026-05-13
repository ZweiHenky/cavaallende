import { createContext, PropsWithChildren, useEffect, useState } from "react";
import socket from "@/core/socket/connect";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socketInstance] = useState(() => socket);

  useEffect(() => {
    socketInstance.connect();

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};