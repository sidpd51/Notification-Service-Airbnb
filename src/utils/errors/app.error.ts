import { StatusCodes } from "http-status-codes";

export interface AppError extends Error {
    statusCode: number;
}

export class InternalServerError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        this.name = "InternalServerError";
        this.message = message;
    }
}

export class BadRequestError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.BAD_REQUEST;
        this.name = "BadRequestError";
        this.message = message;
    }
}

export class UnauthorizedError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.UNAUTHORIZED;
        this.name = "UnauthorizedError";
        this.message = message;
    }
}

export class ForbiddenError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.FORBIDDEN;
        this.name = "ForbiddenError";
        this.message = message;
    }
}

export class NotFoundError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.NOT_FOUND;
        this.name = "NotFoundError";
        this.message = message;
    }
}

export class ConflictError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.CONFLICT;
        this.name = "ConflictError";
        this.message = message;
    }
}

export class UnprocessableEntityError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
        this.name = "UnprocessableEntityError";
        this.message = message;
    }
}

export class TooManyRequestsError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.TOO_MANY_REQUESTS;
        this.name = "TooManyRequestsError";
        this.message = message;
    }
}

export class NotImplementedError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.NOT_IMPLEMENTED;
        this.name = "NotImplementedError";
        this.message = message;
    }
}

export class ServiceUnavailableError implements AppError {
    statusCode: number;
    name: string;
    message: string;
    constructor(message: string) {
        this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
        this.name = "ServiceUnavailableError";
        this.message = message;
    }
}