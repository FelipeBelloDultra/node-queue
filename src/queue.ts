import nodemailer from "nodemailer";
import Bull, { Job } from "bull";

import { env } from "./config";

export const emailQueue = new Bull("email", {
  redis: {
    host: "redis",
    port: 6379,
  },
});

type EmailType = {
  to: string;
  content: string;
};

export const sendNewEmail = async (email: EmailType) => {
  try {
    emailQueue.add(email);
  } catch (error) {
    console.log(error);
  }
};

export const processEmailQueue = async (job: Job) => {
  try {
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

    console.log("Sending mail to %s", job.data.to);

    let info = await transporter.sendMail({
      from,
      to: job.data.to,
      subject,
      text: job.data.content,
      html: job.data.content,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};
