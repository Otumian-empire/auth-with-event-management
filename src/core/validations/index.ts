import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { appConstants } from "../constants";

export function validationMiddleware(
    schema: Joi.ObjectSchema,
    property: "body" | "params" | "query"
) {
    return (request: Request, response: Response, next: NextFunction) => {
        const options = {
            abortEarly: true, // include all errors
            allowUnknown: true, // ignore unknown props
            convert: true,
        };

        const { error, value } = schema.validate(request[property], options);
        const valid = error == null;

        if (valid) {
            request[property] = value;
            return next();
        } else {
            const messages = error.details.map((err) => err.message).join(",");
            return response.status(appConstants.STATUS_CODE.SUCCESS).json({
                success: false,
                message: messages,
            });
        }
    };
}

export const RequiredStringSchema = Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required();
