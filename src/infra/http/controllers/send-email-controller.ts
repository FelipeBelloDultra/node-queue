import { Request, Response } from "express";
import { AddEmailToQueue } from "../../../application/use-cases/add-email-to-queue";
import { BullQueueProvider } from "../../providers/bull-queue-provider";

export class SendEmailController {
  public async create(req: Request, res: Response) {
    const { content, to } = req.body;

    const queueProvider = new BullQueueProvider("mail-queue");
    const addEmailToQueue = new AddEmailToQueue(queueProvider);

    await addEmailToQueue.execute({
      content,
      to,
    });

    return res.json({ message: "Email added to queue" }).status(200);
  }
}
