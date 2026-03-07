import { envConstants } from "../constants/eve-constants";
import { NotificationChannels } from "../notifications/interfaces";
import { EstablishRedisConnection } from "./services";

export async function publisher<T>(channel: NotificationChannels, payload: T) {
    const connection = await EstablishRedisConnection(envConstants.REDIS_URL);

    return await connection.publish(channel, JSON.stringify(payload));
}
