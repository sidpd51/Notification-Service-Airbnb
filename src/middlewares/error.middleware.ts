import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";


export const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}