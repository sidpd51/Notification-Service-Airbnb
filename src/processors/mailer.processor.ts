import { Job, Worker } from "bullmq";
import { getRedisClient } from "../config/redis.config";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_JOB } from "../producers/mailer.producer";
import { NotFoundError } from "../utils/errors/app.error";

export const setupMailerWorker = () => {
    const mailerProcessor = new Worker<NotificationDto>(MAILER_QUEUE, async (job: Job) => {
        if (job.name !== MAILER_JOB) {
            throw new NotFoundError("Invalid job name");
        }

        const payload = job.data;
        console.log(`Processing email to for: ${JSON.stringify(payload)}`);
    }, {
        connection: getRedisClient()
    });

    mailerProcessor.on("completed", (job: Job) => {
        console.log(`Job ${job.id} completed successfully.`);
    });

    mailerProcessor.on("failed", () => {
        console.error(`Job failed.`);
    });
}
