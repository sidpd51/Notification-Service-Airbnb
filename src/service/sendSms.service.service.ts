import { smsQueue } from "../queues/sms.queue";
import { InternalServerError } from "../utils/errors/app.error";
import { SmsPayload } from "../validators/sms.validator";

export const sendSmsService = async (paylod: SmsPayload) => {
    try {
        await smsQueue.add("send-sms", paylod, {
            removeOnComplete: 1000,
            removeOnFail: 5000
        });
    } catch (error) {
        throw new InternalServerError("Something went wrong while sending email.");
    }
}