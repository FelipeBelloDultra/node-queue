import { Queue, Processor, Worker } from "bullmq";

import { env } from "../../config";
import type { QueueProvider } from "../../application/providers/queue-provider.interface";

export class BullQueueProvider implements QueueProvider {
  private readonly queue: Queue;
  private readonly queueName: string;

  constructor(queueName: string) {
    this.queueName = queueName;
    this.queue = new Queue(this.queueName, {
      connection: {
        host: env.redis.host,
        port: env.redis.port,
      },
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 2,
        delay: 4000,
      },
    });
  }

  public async addJob<JobDataType>(jobData: JobDataType) {
    await this.queue.add("message", jobData);
  }

  public process<ProcessDataType>(processFunction: Processor<ProcessDataType>) {
    new Worker(this.queueName, processFunction, {
      connection: {
        host: env.redis.host,
        port: env.redis.port,
      },
      concurrency: 100,
      limiter: {
        max: 400,
        duration: 1000,
      },
    });
  }
}
