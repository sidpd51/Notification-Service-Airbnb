import dotenv from 'dotenv';

type ServerConfigType = {
    PORT: number;
    EMAIL?: string;
    PASSWORD?: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD?: string;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX: number;
}

function loadEnv() {
    dotenv.config();
    console.log('Environment variables loaded');
}

loadEnv();

export const serverConfig: ServerConfigType = {
    PORT: Number(process.env.PORT) || 3000,
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD,
    REDIS_HOST: process.env.REDIS_HOST || 'localhost',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 1,
    RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_WINDOW_MS) || 5
};

