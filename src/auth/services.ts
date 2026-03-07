import { EntityManager } from "typeorm";
import { NotificationChannels } from "../core/constants";
import { CreateUserSuccessfulEmailPayload } from "../core/interfaces";
import { JWTService } from "../core/jwt";
import { PasswordService } from "../core/password";
import { EventOutBox, User } from "../database";
import { CreateUserDto } from "./interfaces";

export class AuthService {
    static async isExistingEmail(email: string) {
        const isExisting = await User.exists({ where: { email } });

        if (isExisting) {
            throw new Error("Account already exits");
        }
    }

    static async createUser(payload: CreateUserDto) {
        const entityManager = User.getRepository().manager;

        return await entityManager.transaction(async (manager) => {
            const { email, firstName, lastName, password } = payload;

            const passwordHash = PasswordService.hash(password);

            const user = await AuthService._createUser(manager, {
                email,
                firstName,
                lastName,
                password: passwordHash,
            });

            const event = await AuthService._createEvent(manager, {
                email,
                firstName,
                lastName,
            });

            const token = AuthService.generateAuthenticationToken(user.uuid);

            return { userId: user.uuid, email, firstName, lastName, token };
        });
    }

    private static generateAuthenticationToken(userId: string) {
        return JWTService.generateToken(userId);
    }

    private static async _createUser(
        manager: EntityManager,
        payload: CreateUserDto
    ) {
        const { email, firstName, lastName, password } = payload;

        const userObject = manager.create(User, {
            firstName,
            lastName,
            email,
            password,
        });

        return await manager.save(User, userObject);
    }

    private static async _createEvent(
        manager: EntityManager,
        payload: CreateUserSuccessfulEmailPayload
    ) {
        const { email, firstName, lastName } = payload;

        const eventObject = manager.create(EventOutBox, {
            type: NotificationChannels.SEND_SIGN_UP_SUCCESS_EMAIL,
            payload: {
                email,
                firstName,
                lastName,
            },
        });

        return await manager.save(EventOutBox, eventObject);
    }
}
