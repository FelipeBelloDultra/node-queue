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
      },
    });
  }

  public async addJob<JobDataType>(jobData: JobDataType) {
    await this.queue.add("message", jobData, {
      delay: 3000, // 3 seconds to add job to queue
    });
  }

  public process<ProcessDataType>(processFunction: Processor<ProcessDataType>) {
    new Worker(this.queueName, processFunction, {
      connection: {
        host: env.redis.host,
        port: env.redis.port,
      },
      limiter: {
        // 1 job per 2 minutes will be processed
        max: 1,
        duration: 2000,
      },
    })
      .on("completed", (job) => {
        console.log(`[${this.queueName}]-[${job.id}]-completed`);
      })
      .on("active", (job) => {
        console.log(`[${this.queueName}]-[${job.id}]-active`);
      })
      .on("failed", (job) => {
        console.log(`[${this.queueName}]-failed`);
      });
  }
}
