import { NotificationDto } from "../dto/notification.dto";
import { mailerQueue } from "../queues/mailer.queue";

export const MAILER_JOB = 'mailer_job';

export const addMailToQueue = async (payload: NotificationDto) => {
    await mailerQueue.add(MAILER_JOB, payload);
}