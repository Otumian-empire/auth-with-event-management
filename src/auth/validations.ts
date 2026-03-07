import Joi from "joi";
import { RequiredStringSchema } from "../core/validations";
import { CreateUserDto } from "./interfaces";

export const createAccountSchema = Joi.object<CreateUserDto>().keys({
    firstName: RequiredStringSchema.lowercase(),
    lastName: RequiredStringSchema.lowercase(),
    email: RequiredStringSchema.email().lowercase(),
    password: RequiredStringSchema,
});
