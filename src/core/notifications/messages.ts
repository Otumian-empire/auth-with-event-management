import { envConstants } from "../constants/eve-constants";
import { CreateUserSuccessfulEmailPayload } from "../interfaces";

const { NOTIFICATION_EMAIL } = envConstants;

export class NotificationMessages {
    static sendAccountCreatedSuccessfully(
        payload: CreateUserSuccessfulEmailPayload
    ) {
        const { email, firstName, lastName } = payload;

        return (
            `Hi ${firstName} ${lastName}. You have successfully created your account. ` +
            `We will keep you update on ${email}. Feel free to hit us up at: ${NOTIFICATION_EMAIL}. ` +
            `Best regards, App.`
        );
    }
}
