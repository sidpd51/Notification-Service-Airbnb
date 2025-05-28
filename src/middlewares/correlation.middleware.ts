import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import { asyncLocalStorage } from "../utils/helpers/correlation.helper";

export const attachCorrelationIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const correlationId = v4();

    asyncLocalStorage.run({ correlationId: correlationId }, () => {
        next();
    });
}