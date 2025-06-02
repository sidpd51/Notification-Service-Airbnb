import Redis from "ioredis";
import { serverConfig } from ".";

function connectToRedis() {
    try {
        let connection: Redis;
        const redisConfig = {
            host: serverConfig.REDIS_HOST,
            port: serverConfig.REDIS_PORT,
            password: serverConfig.REDIS_PASSWORD,
            maxRetriesPerRequest: null, // Disable automatic retries
        };
        return () => {
            if (!connection) {
                connection = new Redis(redisConfig);
                return connection;
            }

            return connection;
        }

    } catch (error) {
        console.error("Error connecting to Redis:", error);
        throw error;
    }
}

export const getRedisClient = connectToRedis();