import { Queue } from "bullmq";
import { getRedisClient } from "../config/redis.config";

export const MAILER_QUEUE = "mailer-queue";

export const mailerQueue = new Queue(MAILER_QUEUE, { connection: getRedisClient() });