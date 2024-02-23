import express from "express";
import nodemailer from "nodemailer";

import { env } from "./config";

const app = express();

app.use(express.json());
app.post("/api/users", async (req, res) => {
  console.log(req.body);

  const { to, content } = req.body;

  const { from, subject } = {
    from: env.mail.fromAddress,
    subject: env.mail.fromName,
  };

  const transporter = nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    secure: false,
    auth: {
      user: env.mail.username,
      pass: env.mail.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  console.log("Sending mail to %s", to);

  let info = await transporter.sendMail({
    from,
    to,
    subject,
    text: content,
    html: content,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return res.json({
    message: "Email Sent",
  });
});

app.listen(3333);
