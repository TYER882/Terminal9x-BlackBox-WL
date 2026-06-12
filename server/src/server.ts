import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

async function startServer() {
  await connectDb();

  app.listen(env.port, () => {
    console.log(`Cold Inbox API listening on http://localhost:${env.port}`);
  });
}

void startServer();
