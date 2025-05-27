import { Worker } from "bullmq";
import { connection } from "../config";

export const emailWorker = new Worker("email-queue", async (job) => {
    //logic to be implemented!
    console.log(`📧 Sending emails to ${job.data.to}`)

}, { connection, concurrency: 5 });


emailWorker.on('completed', (job) => {
    console.log(`🎉 Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
    console.log(`❌ Job ${job?.id} failed: ${err.message}`);
});

