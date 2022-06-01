import { app, httpServer } from './app.js';

import { webhookHandler } from "./webhook.js";

app.get("/api/webhook", webhookHandler);

httpServer.listen(3000, () => {
  const address = httpServer.address();
  console.log(
    `🌐 Listening on ${
      typeof address === "string" ? address : address.address
    }:3000`
  );
});
