import { createTransport } from "nodemailer";
import { serverConfig } from "../../config";

export const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: serverConfig.EMAIL,
        pass: serverConfig.PASSWORD
    }
});