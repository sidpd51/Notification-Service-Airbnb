import { Job, Worker } from "bullmq";
import { serverConfig } from "../config";
import { getRedisClient } from "../config/redis.config";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_JOB } from "../producers/mailer.producer";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { renderMailerTemplates } from "../templates/templates.handler";
import { NotFoundError } from "../utils/errors/app.error";
import { transporter } from "../utils/helpers/sendMail.helper";

export const setupMailerWorker = () => {
    const mailerProcessor = new Worker<NotificationDto>(MAILER_QUEUE, async (job: Job) => {

        if (job.name !== MAILER_JOB) {
            throw new NotFoundError("Invalid job name");
        }

        const data: NotificationDto = job.data;
        const html = await renderMailerTemplates(data.template, data.params);

        const mailOptions = {
            from: serverConfig.EMAIL,
            to: data.to,
            subject: data.subject,
            html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error:', error);
            }
            console.log('Email sent:', info.response);

        });
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
