import { createContext, PropsWithChildren } from "react";
import socket from "@/core/socket/connect";

export const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};