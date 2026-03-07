import "reflect-metadata";

import express from "express";
import authRouter from "./auth";
import { ErrorHandler } from "./core/handlers/error-handler";
import { subscriber } from "./core/redis-pub-sub";
import { AppDataSource } from "./database";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/liveness-check", (_req, res) => {
    return res.json({
        success: true,
        message: "Service is running: Ping-pong!!",
    });
});

app.use("/auth", authRouter);

app.use(ErrorHandler);

AppDataSource.initialize()
    .then((connection) => {
        if (connection.isInitialized) {
            console.log("Database connected...");
            subscriber()
                .then(() =>
                    app.listen(3000, () =>
                        console.log("APP running on port 3000")
                    )
                )
                .catch((error) => {
                    console.log("Could initiate pub-sub subscription - ");
                    console.log(
                        JSON.stringify(
                            error,
                            Object.getOwnPropertyNames(error),
                            4
                        )
                    );

                    process.exit(1);
                });
        } else {
            console.log(
                "Could not connect to database. Please check your env configurations for rectifications"
            );
            process.exit(1);
        }
    })
    .catch((error) => {
        console.log(
            JSON.stringify(error, Object.getOwnPropertyNames(error), 4)
        );

        process.exit(1);
    });
