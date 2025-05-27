import { NextFunction, Request, Response } from "express";
import { sendEmailService } from "../service/sendEmail.service";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../utils/errors/app.error";

export const sendEmailHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sendEmailService(req.body);
        res.status(StatusCodes.ACCEPTED).json({
            message: "We've successfully added your email to the queue. It will be processed shortly.",
            success: true,
            data: {}
        });
    } catch (error) {
        if (error instanceof InternalServerError) {
            res.status(error.statusCode).json({
                message: error.message,
                success: false,
                data: {}
            })
        }
    }
}