import { Request, Response, NextFunction } from 'express';

export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    // Log the error (could be enhanced for production)
    console.error('heree', err);

    // Set status code
    const status = err.status || StatusCode.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
        status: status,
    });
}
