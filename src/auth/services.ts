import { CreateUserSuccessfulEmailPayload } from "../core/interfaces";
import { JWTService } from "../core/jwt";
import { NotificationChannels } from "../core/notifications/interfaces";
import { PasswordService } from "../core/password";
import { publisher } from "../core/redis-pub-sub";
import { User } from "../database";
import { CreateUserDto } from "./interfaces";

export class AuthService {
    static async isExistingEmail(email: string) {
        const isExisting = await User.exists({ where: { email } });

        if (isExisting) {
            throw new Error("Account already exits");
        }
    }

    static async createUser(payload: CreateUserDto) {
        const { email, firstName, lastName, password } = payload;

        const passwordHash = PasswordService.hash(password);

        const user = await User.save(
            User.create({
                firstName,
                lastName,
                email,
                password: passwordHash,
            })
        );

        return { userId: user.uuid, email, firstName, lastName };
    }

    static generateAuthenticationToken(userId: string) {
        return JWTService.generateToken(userId);
    }

    static async emitSendSuccessSignUpEmail(
        payload: CreateUserSuccessfulEmailPayload
    ) {
        publisher(NotificationChannels.SEND_SIGN_UP_SUCCESS_EMAIL, payload);
    }
}
