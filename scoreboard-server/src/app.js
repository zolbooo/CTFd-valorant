import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

export const app = express();
export const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
