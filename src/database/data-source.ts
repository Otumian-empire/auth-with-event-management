import { join } from "node:path";
import { DataSource } from "typeorm";
import { envConstants } from "../core/constants/eve-constants";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: envConstants.DATABASE_USERNAME,
    password: envConstants.DATABASE_PASSWORD,
    database: envConstants.DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: [join(__dirname, "/entity/*{.js,.ts}")],
    migrations: [join(__dirname, "/migration/*{.js,.ts}")],
    subscribers: [],
    migrationsTableName: "customMigrationTable",
});
