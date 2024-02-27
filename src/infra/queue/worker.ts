import { BullQueueProvider } from "../providers/bull-queue-provider";
import { NodemailerMailProvider } from "../providers/nodemailer-mail-provider";

import { SendEmail } from "../../application/use-cases/send-email";

const emailQueueProvider = new BullQueueProvider("mail-queue");
const nodemailerMailProvider = new NodemailerMailProvider();

const sendMail = new SendEmail(nodemailerMailProvider);

emailQueueProvider.process<{
  to: string;
  content: string;
}>(async ({ data }) => {
  const { content, to } = data;

  await sendMail.execute({ content, to });
});
