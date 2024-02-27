import express from "express";
import { router } from "./routes";
import { env } from "../../config";

const app = express();

app.use(express.json());
app.use(router);

app.listen(env.api.port, () => {
  console.log(`[🚀]: server running on port ${env.api.port}`);
});
