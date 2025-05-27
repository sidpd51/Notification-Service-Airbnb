import dotenv from 'dotenv';
import IORedis from 'ioredis';

type ServerConfigType = {
    PORT: number;
}

function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
};

export const connection = new IORedis({
    host: "127.0.0.1",
    port: 6379,
    password: "123456",
    maxRetriesPerRequest: null,
})

