import express from "express";
import { app, httpServer } from "./app.js";

import { webhookHandler } from "./webhook.js";

app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

const port = Number(process.env.PORT) || 3000;
httpServer.listen(port, () => {
  const address = httpServer.address();
  console.log(
    `🌐 Listening on ${
      typeof address === "string" ? address : address.address
    }:${port}`
  );
});
