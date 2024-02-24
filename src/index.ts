import express from "express";
import { sendNewEmail } from "./queue";

const app = express();

app.use(express.json());
app.post("/api/users", async (req, res) => {
  const { to, content } = req.body;

  await sendNewEmail({
    content,
    to,
  });

  return res.json({
    message: "Email Sent",
  });
});

app.listen(3333);
