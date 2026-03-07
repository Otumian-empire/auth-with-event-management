import { createClient } from "redis";

export async function EstablishRedisConnection(
    url: string,
    duplicate: boolean = false
) {
    const connection = duplicate
        ? createClient({ url })
        : createClient({ url }).duplicate();

    connection.on("error", (error) =>
        console.error("Redis Publisher Error:", error)
    );

    await connection.connect();

    return connection;
}
