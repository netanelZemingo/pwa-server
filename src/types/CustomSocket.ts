import { Server } from "socket.io";

interface ServerToClientEvents {
  newMessage: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {}

interface InterServerEvents {}

interface SocketData {}

// Define a custom socket type using TypeScript generics
export type CustomSocket = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
