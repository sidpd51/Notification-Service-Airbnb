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
    host: "127.0.0.1",
    port: 6379,
    password: "123456",
    maxRetriesPerRequest: null,
})

