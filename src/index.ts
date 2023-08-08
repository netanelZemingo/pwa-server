import express, { Request, Response, json } from "express";
import { createServer as createHttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import webpush from "web-push";
import { Db } from "./db/Db";
import { config } from "./config";
import { chatController } from "./controllers/chat.controller";
import { authController } from "./controllers/auth.controller";

import cors from "cors";
import { authenticateToken } from "./middlewares/authenticateToken";

webpush.setVapidDetails("mailto:noti56@gmail.com", config.vapidPublicKey, config.vapidPrivateKey);
export const app = express();
app.use(json());
app.use(cors());
const server = createHttpServer(app);
const port = 80;

export const ioServer = new SocketServer(server);

app.get("/", (req: Request, res: Response) => {
  req.res.send("Application works!");
});

app.use("/auth", authController);
app.use("/chat", authenticateToken, chatController);
Db.init().then(() => {
  server.listen(port, () => {
    console.log(`Application started on port ${port}!`);
  });
});
