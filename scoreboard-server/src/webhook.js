import "dotenv-flow/config.js";

import crypto from "crypto";
import getRawBody from "raw-body";

import { io } from "./app.js";

const { WEBHOOK_SECRET } = process.env;
if (!WEBHOOK_SECRET) {
  throw Error("WEBHOOK_SECRET is not defined");
}

export const webhookHandler = async (req, res) => {
  const rawBody = await getRawBody(req);

  const digest = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (digest !== req.headers["x-valorant-signature"]) {
    console.warn(
      `Rejected webhook invocation from ${
        req.headers["x-forwarded-for"] ?? req.socket.remoteAddress
      }`
    );
    res.status(401).send("Forbidden");
    return;
  }

  const { type, ...payload } = JSON.parse(rawBody.toString("utf-8"));
  io.emit(type, payload);
  res.status(200).send({ success: true });
};
