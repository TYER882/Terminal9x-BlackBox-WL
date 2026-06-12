import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";

await connectDb();

app.listen(env.port, () => {
  console.log(`Cold Inbox API listening on http://localhost:${env.port}`);
});
