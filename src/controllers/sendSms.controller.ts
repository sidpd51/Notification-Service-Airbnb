import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { InternalServerError } from "../utils/errors/app.error";
import { sendSmsService } from "../service/sendSms.service.service";

export const sendSms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sendSmsService(req.body);
        res.status(StatusCodes.OK).json({
            message: "We've successfully added your sms to the queue. It will be processed shortly.",
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