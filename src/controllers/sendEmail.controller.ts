import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.config";
import { mailerService } from "../service/mailer.service";
import { InternalServerError } from "../utils/errors/app.error";

export const sendEmailHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await mailerService(req.body);
        logger.info("Successfully added email payload to email-queue!");
        res.status(StatusCodes.ACCEPTED).json({
            message: "We've successfully added your email to the queue. It will be processed shortly.",
            success: true,
            data: {}
        });
    } catch (error) {
        if (error instanceof InternalServerError) {
            logger.error(`Error in sendEmailHandler, ${error.message}`);
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            })
        }
    }
}