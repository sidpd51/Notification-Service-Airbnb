import rateLimit from "express-rate-limit";
import { serverConfig } from ".";

export const limiter = rateLimit({
    windowMs: serverConfig.RATE_LIMIT_WINDOW_MS,
    max: serverConfig.RATE_LIMIT_MAX,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});