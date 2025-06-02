import { NotificationDto } from "../dto/notification.dto";
import { addMailToQueue } from "../producers/mailer.producer";
import { InternalServerError } from "../utils/errors/app.error";

export const sendEmailService = async (paylod: NotificationDto) => {
    try {
        await addMailToQueue(paylod);
    } catch (error) {
        throw new InternalServerError("Something went wrong while sending email.");
    }
}