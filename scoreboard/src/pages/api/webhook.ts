import crypto from "crypto";
import getRawBody from "raw-body";
import { NextApiRequest, NextApiResponse, PageConfig } from "next";

const { WEBHOOK_SECRET } = process.env;
if (!WEBHOOK_SECRET) {
  throw Error("WEBHOOK_SECRET is not defined");
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const body = JSON.parse(rawBody.toString("utf-8"));
  // TODO: Handle incoming event
  console.log(body);
  res.status(200).send({ success: true });
};

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default webhookHandler;
