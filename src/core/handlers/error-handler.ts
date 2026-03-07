import { NextFunction, Request, Response } from "express";
import { appConstants, NotificationChannels } from "../constants";
import { publisher } from "../redis-pub-sub";
import { AppError } from "./app-error";

export async function ErrorHandler(
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    let statusCode = appConstants.STATUS_CODE.INTERNAL_SERVER_ERROR;
    let message = "An error occurred";

    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }

    res.status(statusCode).json({
        success: false,
        message,
    });

    await publisher(NotificationChannels.SEND_ERROR_LOGS, {
        error: {
            stack: JSON.stringify(error.stack, null, 4),
            message: error.message,
            name: error.name,
            statusCode,
        },
        url: req.originalUrl,
        body: { ...req.body, password: undefined },
        params: req.params,
        query: req.query,
    });

    return;
}
