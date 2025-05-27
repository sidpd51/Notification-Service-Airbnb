import { Queue } from "bullmq";
import { connection } from "../config";


export const smsQueue = new Queue("sms-queue", { connection });