import { InternalServerError } from "../utils/errors/app.error";
import { SmsPayload } from "../validators/sms.validator";

export const sendSmsService = async (paylod: SmsPayload) => {
    try {

    } catch (error) {
        throw new InternalServerError("Something went wrong while sending email.");
    }
}