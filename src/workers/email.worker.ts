import { Worker } from "bullmq";
import { connection } from "../config";

export const emailWorker = new Worker("email-queue", async (job) => {
    console.log(`📧 Sending email to ${job.data.email}`)

}, { connection, concurrency: 5 });


emailWorker.on('completed', (job) => {
    console.log(`🎉 Job ${job.id} completed`);
})

emailWorker.on('failed', (job, err) => {
    console.log(`❌ Job ${job?.id} failed: ${err.message}`);
})

