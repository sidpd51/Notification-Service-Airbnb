import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../config/logger.config";

export const getBookingsHanlder = async (req: Request, res: Response, next: NextFunction) => {
    logger.info("inside getBookingsHandler")
    res.status(StatusCodes.NOT_IMPLEMENTED).send("Not yet implemented!");
}
