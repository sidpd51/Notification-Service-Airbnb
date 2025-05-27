import { Queue } from "bullmq";
import { connection } from "../config";


export const emailQueue = new Queue("email-queue", { connection })