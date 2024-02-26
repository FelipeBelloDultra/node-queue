import type { UseCase } from "../../core/use-case.interface";
import type { QueueProvider } from "../providers/queue-provider.interface";

type Input = {
  to: string;
  content: string;
};

export class AddEmailToQueue implements UseCase<Input> {
  constructor(private readonly mailQueueProvider: QueueProvider) {}

  public async execute({ to, content }: Input) {
    await this.mailQueueProvider.addJob({ to, content });
  }
}
