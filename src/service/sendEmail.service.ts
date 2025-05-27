import { emailQueue } from "../queues/email.queue";
import { InternalServerError } from "../utils/errors/app.error";
import { EmailPayload } from "../validators/email.validator";

export const sendEmailService = async (paylod: EmailPayload) => {
    try {
        await emailQueue.add("send-email", paylod, {
            removeOnComplete: 1000,
            removeOnFail: 5000
        });
    } catch (error) {
        throw new InternalServerError("Something went wrong while sending email.");
    }
}