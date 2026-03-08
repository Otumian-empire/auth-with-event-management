import { NotificationChannels, envConstants } from "../constants";
import { EstablishRedisConnection } from "./services";

export async function publisher<T>(channel: NotificationChannels, payload: T) {
    const connection = await EstablishRedisConnection.getCommandClient(
        envConstants.REDIS_URL
    );

    return await connection.publish(channel, JSON.stringify(payload));
}
