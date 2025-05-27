import { Worker } from "bullmq";
import { connection } from "../config";

export const smsWorker = new Worker("sms-queue", async (job) => {
    //logic to be implemented!
    console.log(`📧 Sending sms to ${job.data.to}`)

}, { connection, concurrency: 5 });


smsWorker.on('completed', (job) => {
    console.log(`🎉 Job ${job.id} completed`);
})

smsWorker.on('failed', (job, err) => {
    console.log(`❌ Job ${job?.id} failed: ${err.message}`);
})

