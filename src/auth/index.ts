import { Router } from "express";
import { validationMiddleware } from "../core/validations";
import { CreateAccount } from "./controllers";
import { createAccountSchema } from "./validations";

const router = Router();

router.post(
    "/sign-up",
    validationMiddleware(createAccountSchema, "body"),
    CreateAccount
);

export default router;
