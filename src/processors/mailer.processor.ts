import { Job, Worker } from "bullmq";
import { getRedisClient } from "../config/redis.config";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_JOB } from "../producers/mailer.producer";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotFoundError } from "../utils/errors/app.error";
import { renderMailerTemplates } from "../templates/templates.handler";
import { sendEmailService } from "../service/mailer.service";

export const setupMailerWorker = () => {
    const mailerProcessor = new Worker<NotificationDto>(MAILER_QUEUE, async (job: Job) => {

        if (job.name !== MAILER_JOB) {
            throw new NotFoundError("Invalid job name");
        }

        const payload: NotificationDto = job.data;
        const emailContent = await renderMailerTemplates(payload.template, payload.params);
        await sendEmailService(payload, emailContent);
    }, {
        connection: getRedisClient()
    });

    mailerProcessor.on("completed", (job: Job) => {
        console.log(`Email send to: ${job.data.to} successfully.`);
    });

    mailerProcessor.on("failed", (job, error) => {
        console.error(`Job failed. ${error}`);
    });
}
