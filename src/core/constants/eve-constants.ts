import "dotenv/config";

export const envConstants = {
    DATABASE_NAME: process.env?.DATABASE_NAME ?? "",
    DATABASE_USERNAME: process.env?.DATABASE_USERNAME ?? "",
    DATABASE_PASSWORD: process.env?.DATABASE_PASSWORD ?? "",
    DATABASE_PORT: Number(process.env?.DATABASE_PORT ?? 3000),
    DATABASE_HOST: process.env?.DATABASE_HOST ?? "",

    // password
    PASSWORD_INDICATOR: process.env?.PASSWORD_INDICATOR ?? "$//MAUTH$",
    PASSWORD_KEY_LENGTH: Number(process.env?.PASSWORD_KEY_LENGTH ?? 64),
    PASSWORD_SALT_LENGTH: Number(process.env?.PASSWORD_SALT_LENGTH ?? 16),

    // jwt
    JWT_SECRET: process.env?.JWT_SECRET ?? "",
    JWT_TTL: Number(process?.env.JWT_TTL ?? 1200),

    // redis
    REDIS_URL: process.env?.REDIS_URL ?? "",

    // notifications
    NOTIFICATION_URL: process.env?.NOTIFICATION_URL ?? "",
    NOTIFICATION_EMAIL: process.env?.NOTIFICATION_EMAIL ?? "",
};
