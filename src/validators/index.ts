import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyZodObject, ZodError } from "zod";

export const validateRequetBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Invalid request body",
                    success: false,
                    error: err.issues.map((issue: any) => {
                        return `${issue.message}, field: ${issue.path.join("")}`
                    })
                })
            }
            else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                    message: "Unexpected validation error",
                    success: false,
                });
            }
        }
    }
}