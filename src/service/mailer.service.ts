import { serverConfig } from "../config";
import { logger } from "../config/logger.config";
import { transporter } from "../config/mailer.config";
import { NotificationDto } from "../dto/notification.dto";
import { addMailToQueue } from "../producers/mailer.producer";
import { InternalServerError } from "../utils/errors/app.error";

export const sendEmailService = async (paylod: NotificationDto, body: string) => {
    try {

        const mailOptions = {
            from: serverConfig.EMAIL,
            to: paylod.to,
            subject: paylod.subject,
            html: body
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to: ${paylod.to} with subject: ${paylod.subject}`);

    } catch (error) {
        throw new InternalServerError("Something went wrong while sending email.");
    }
}

export const mailerService = async (paylod: NotificationDto) => {
    try {
        await addMailToQueue(paylod);
    } catch (error) {
        throw new InternalServerError("Something went wrong while sending email.");
    }
}