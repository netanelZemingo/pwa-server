// /* eslint-disable @typescript-eslint/no-namespace */
// /* eslint-disable @typescript-eslint/prefer-namespace-keyword */
// import { Server, Socket } from "socket.io";
// import http from "http";
// import { MessageDto } from "./db/Messages";

// export type MySocketServer = Server<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >;
// export type mySocketClient = Socket<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >;
// interface ServerToClientEvents {
//   newMessageRecieved: (latestMessage: MessageDto) => void;
//   //   userDisconnected: (peer_id: string) => void;
//   //   userConnected: (_: { peer_id: string; roomUsers: { [peer_id: string]: IUserInRoom } }) => void;
//   //   characterMovement: (_: { peer_id: string; position: Vec3; rotation: Vec3 }) => void;
//   //   animation: (_: { peer_id: string; animation: keyof Person }) => void;
//   //   collisionPerson: (_: { peer_id: string; movement: Movemoment }) => void;
//   //   adChange: (ad: IAd) => void;
//   //   inputChange: (_: { peer_id: string; actionMap: ActionMap; rotation: Vec3 }) => void;
// }

// // Record<specialKeysActions, boolean>;

// interface ClientToServerEvents {
//   //   onMovement: (_: { roomId: string; peer_id: string; position: Vec3; rotation: Vec3 }) => void;
//   //   onInput: (_: { roomId: string; peer_id: string; actionMap: ActionMap; rotation: Vec3 }) => void;
//   //   onJoinRoom: (_: { roomId: string; peer_id: string; userInRoom: IUserInRoom }) => void;
//   //   onAnimation: (_: { roomId: string; peer_id: string; animation: keyof Person }) => void;
//   //   onCollisionPerson: (_: { roomId: string; peer_id: string; movement: Movemoment }) => void;
// }

// interface InterServerEvents {
//   //   ping: () => void;
// }

// interface SocketData {
//   name: string;
//   age: number;
// }

// export class SocketApp {
//   static socketServer: MySocketServer | null = null;

//   static async initiateServer(server: http.Server) {
//     if (!this.socketServer) {
//       this.socketServer = new Server<MySocketServer>(server, {
//         cors: { origin: "*" },
//       });
//       this.listenForSockets();
//     }
//     return this.socketServer;
//   }
//   static getInstance() {
//     if (!this.socketServer) throw new Error("no socket server");
//     return this.socketServer;
//   }

//   private static listenForSockets() {
//     this.socketServer?.on("connection", (socket) => {
//       console.log("connected a socket", socket.id);
//       //   listenToRooms(socket);
//       //   listenToMovement(socket);
//       //   animationHandler(socket);
//       //   collisionHandler(socket);
//       //   listenToInput(socket);
//     });
//   }
// }
// export default SocketApp;
