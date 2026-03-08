import axios, { AxiosError } from "axios";
import { envConstants } from "../constants/eve-constants";
import fs from "node:fs";
import path from "node:path";

const { NOTIFICATION_URL } = envConstants;

export async function sendNotification(message: string) {
    try {
        await axios.post(NOTIFICATION_URL, message);
    } catch (error) {
        // console.error(
        //     "Failed to send remote notification, writing to local fallback..."
        // );

        const logDir = path.join(process.cwd(), "logs", "notifications");
        const logFilePath = path.join(logDir, "failed-notifications.log");

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const logEntry = {
            timestamp: new Date().toISOString(),
            message,
            error:
                error instanceof AxiosError
                    ? {
                          code: error.code,
                          status: error.response?.status,
                          data: error.response?.data,
                      }
                    : (error as Error).message,
        };

        fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + "\n", "utf8");
    }
}
