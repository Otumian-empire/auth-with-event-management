import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "./interfaces";
import { AuthService } from "./services";
import { appConstants } from "../core/constants";

export async function CreateAccount(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { firstName, lastName, email, password }: CreateUserDto =
            req.body;

        await AuthService.isExistingEmail(email);

        const user = await AuthService.createUser({
            firstName,
            lastName,
            email,
            password,
        });

        return res.status(appConstants.STATUS_CODE.SUCCESS).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return next(error);
    }
}
