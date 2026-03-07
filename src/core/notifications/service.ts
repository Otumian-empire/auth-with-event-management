import axios from "axios";
import { envConstants } from "../constants/eve-constants";

const { NOTIFICATION_URL } = envConstants;

export async function sendNotification(message: string) {
    // TODO: we can listen on the response and recheck on this later
    await axios.post(NOTIFICATION_URL, message);
}
