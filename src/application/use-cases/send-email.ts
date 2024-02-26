import type { UseCase } from "../../core/use-case.interface";
import type { MailProvider } from "../providers/mail-provider.interface";

type Input = {
  to: string;
  content: string;
};

export class SendEmail implements UseCase<Input> {
  constructor(private readonly mailProvider: MailProvider) {}

  public async execute({ to, content }: Input) {
    await this.mailProvider.sendMail({
      content,
      to,
    });
  }
}
