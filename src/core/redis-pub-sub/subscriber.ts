import { envConstants } from "../constants/eve-constants";
import { CreateUserSuccessfulEmailPayload } from "../interfaces";
import {
    NotificationChannels,
    NotificationMessages,
    sendNotification,
} from "../notifications";
import { EstablishRedisConnection } from "./services";

export async function subscriber() {
    const connection = await EstablishRedisConnection(
        envConstants.REDIS_URL,
        true
    );

    console.log("Subscriber service running...");

    await connection.subscribe(
        NotificationChannels.SEND_SIGN_UP_SUCCESS_EMAIL,
        async (payload: string) => {
            const _payload = JSON.parse(
                payload
            ) as CreateUserSuccessfulEmailPayload;

            const message =
                NotificationMessages.sendAccountCreatedSuccessfully(_payload);

            await sendNotification(message);
        }
    );

    await connection.subscribe(
        NotificationChannels.SEND_ERROR_LOGS,
        async (payload: string) => {
            const _payload = JSON.parse(payload);

            await sendNotification(_payload);
        }
    );
}
