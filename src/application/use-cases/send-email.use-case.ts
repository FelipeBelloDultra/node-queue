import { UseCase } from "../../core/use-case.interface";

type Input = {
  to: string;
  content: string;
};

export class SendEmail implements UseCase<Input> {
  public async execute({ to, content }: Input) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}
