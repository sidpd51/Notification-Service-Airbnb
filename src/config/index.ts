import dotenv from 'dotenv';
import IORedis from 'ioredis';

type ServerConfigType = {
    PORT: number;
    EMAIL?: string;
    PASSWORD?: string;
}

function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
};

export const connection = new IORedis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_HOST) || 6379,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
})

