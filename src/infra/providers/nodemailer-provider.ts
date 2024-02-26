import nodemailer, { Transporter } from "nodemailer";

import { env } from "../../config";
import type {
  MailProvider,
  SendMailData,
} from "../../application/providers/mail-provider.interface";

export class NodemailerProvider implements MailProvider {
  private readonly transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
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
  }

  public async sendMail(data: SendMailData) {
    await this.transporter.sendMail({
      from: env.mail.fromAddress,
      subject: env.mail.fromName,
      to: data.to,
      text: data.content,
      html: data.content,
    });
  }
}
