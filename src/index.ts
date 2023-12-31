import express, { NextFunction, Request, Response, json } from "express";
import { createServer as createHttpServer } from "http";
// import { Server as SocketServer } from "socket.io";
import webpush from "web-push";
import { Db } from "./db/Db";
import { config } from "./config";
import { chatController } from "./controllers/chat.controller";
import { authController } from "./controllers/auth.controller";

import cors from "cors";
import { authenticateToken } from "./middlewares/authenticateToken";
// import SocketApp from "./SocketApp";

webpush.setVapidDetails("mailto:noti56@gmail.com", config.vapidPublicKey, config.vapidPrivateKey);
export const app = express();
// app.use(cors())
// app.use((_req, res, next) => {
//   res.set({
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "*",
//     "Access-Control-Allow-Headers":
//       "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
//   });

//   next();
// });

app.use(
  // cors({
  //   origin: function (origin, callback) {
  //     callback(null, true);
  //   },
  // })
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
  })
);

app.use(json());

const server = createHttpServer(app);
const port = process.env.PORT || 3000;

// export const ioServer = new SocketServer(server, { cors: { origin: "*" } });
// void SocketApp.initiateServer(server);

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
