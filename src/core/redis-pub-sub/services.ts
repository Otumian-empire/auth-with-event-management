import { createClient, RedisClientType } from "redis";

export class EstablishRedisConnection {
    private static commandInstance: RedisClientType;
    private static subscriberInstance: RedisClientType;

    /**
     * For standard operations: SET, GET, PUBLISH
     */
    public static async getCommandClient(
        url: string
    ): Promise<RedisClientType> {
        if (!this.commandInstance) {
            this.commandInstance = createClient({ url });
            this.commandInstance.on("error", (err) =>
                console.error("Redis Command Error", err)
            );
            await this.commandInstance.connect();
        }
        return this.commandInstance;
    }

    /**
     * Dedicated for SUBSCRIBE operations only
     */
    public static async getSubscriberClient(
        url: string
    ): Promise<RedisClientType> {
        if (!this.subscriberInstance) {
            // .duplicate() is needed because a client in 'subscriber' mode
            // cannot be used for regular commands.
            const baseClient = await this.getCommandClient(url);
            this.subscriberInstance = baseClient.duplicate();
            this.subscriberInstance.on("error", (err) =>
                console.error("Redis Sub Error", err)
            );
            await this.subscriberInstance.connect();
        }
        return this.subscriberInstance;
    }
}
