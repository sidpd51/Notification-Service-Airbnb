import { InternalServerError } from "../utils/errors/app.error";
import { EmailPayload } from "../validators/email.validator";

export const sendEmailService = async (paylod: EmailPayload) => {
    try {

    } catch (error) {
        throw new InternalServerError("Something went wrong while sending email.");
    }
}