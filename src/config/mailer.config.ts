import { createTransport } from "nodemailer";
import { serverConfig } from ".";

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: serverConfig.EMAIL,
        pass: serverConfig.PASSWORD
    }
});