import { Worker } from "bullmq";
import { connection, serverConfig } from "../config";
import nodemailer from 'nodemailer';
import { bookingTemplate, welcomeTemplate } from "../templates/index.template";
import { UserSchemaPaylod } from "../validators/email.validator";


export const emailWorker = new Worker("email-queue", async (job) => {
    //logic to be implemented!
    const { to, subject, orderId, templateType } = job.data;

    if (templateType === "BOOKING") {
        to.forEach((obj: UserSchemaPaylod) => {
            const mailOptions = {
                from: serverConfig.EMAIL,
                to: obj.email,
                subject: subject,
                html: bookingTemplate({ name: obj.name, orderId })
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log('Error:', error);
                }
                console.log(`📧 Sending email to ${obj.email}`);
            });
        });
    };

    if (templateType === "WELCOME") {
        to.forEach((obj: UserSchemaPaylod) => {
            const mailOptions = {
                from: serverConfig.EMAIL,
                to: obj.email,
                subject: subject,
                html: welcomeTemplate({ name: obj.name })
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log('Error:', error);
                }
                console.log(`📧 Sending email to ${obj.email}`);
            });
        });
    }

}, { connection, concurrency: 5 });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: serverConfig.EMAIL,
        pass: serverConfig.PASSWORD
    },
});

emailWorker.on('completed', (job) => {
    console.log(`🎉 Email send for jobId: ${job.id}`);
});

emailWorker.on('failed', (job, err) => {
    console.log(`❌ Job ${job?.id} failed: ${err.message}`);
});

