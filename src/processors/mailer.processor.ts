import { Job, Worker } from "bullmq";
import { serverConfig } from "../config";
import { getRedisClient } from "../config/redis.config";
import { NotificationDto } from "../dto/notification.dto";
import { MAILER_JOB } from "../producers/mailer.producer";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { NotFoundError } from "../utils/errors/app.error";
import { transporter } from "../utils/helpers/sendMail.helper";
import { templateType } from "../templates/templateType";
import fs from 'fs/promises';
import Handlebars from "handlebars";

export const setupMailerWorker = () => {
    const mailerProcessor = new Worker<NotificationDto>(MAILER_QUEUE, async (job: Job) => {

        if (job.name !== MAILER_JOB) {
            throw new NotFoundError("Invalid job name");
        }

        const data: NotificationDto = job.data;
        let html = '';
        if (data.template === templateType.BOOKING) {
            const templatePath = `src/templates/${templateType.BOOKING}.hbs`;
            const source = await fs.readFile(templatePath, 'utf-8');
            const compiledTemplate = Handlebars.compile(source);
            html = compiledTemplate(data.params);
        };

        if (data.template === templateType.WELCOME) {
            const templatePath = `src/templates/${templateType.WELCOME}.hbs`;
            const source = await fs.readFile(templatePath, 'utf-8');
            const compiledTemplate = Handlebars.compile(source);
            html = compiledTemplate(data.params);
        };

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
        console.log(`Job ${job.id} completed successfully.`);
    });

    mailerProcessor.on("failed", (job, error) => {
        console.error(`Job failed. ${error}`);
    });
}
