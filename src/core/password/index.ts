import crypto from "node:crypto";
import { envConstants } from "../constants/eve-constants";

const { PASSWORD_INDICATOR, PASSWORD_KEY_LENGTH, PASSWORD_SALT_LENGTH } =
    envConstants;

export class PasswordService {
    static hash(plainText: string) {
        try {
            const salt = crypto
                .randomBytes(PASSWORD_SALT_LENGTH / 2)
                .toString("hex");

            const hash = crypto.scryptSync(
                plainText,
                salt,
                PASSWORD_KEY_LENGTH
            );

            return `${salt}${PASSWORD_INDICATOR}${hash.toString("hex")}`;
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            throw error;
        }
    }

    static compare(plainText: string, hashedText: string) {
        try {
            const [salt, hash] = hashedText.split(PASSWORD_INDICATOR);

            const computedHash = crypto
                .scryptSync(plainText, salt, PASSWORD_KEY_LENGTH)
                .toString("hex");

            const passwordHashBuffer = Buffer.from(hash, "hex");
            const computedHashBuffer = Buffer.from(computedHash, "hex");

            return (
                passwordHashBuffer.length === computedHashBuffer.length &&
                crypto.timingSafeEqual(passwordHashBuffer, computedHashBuffer)
            );
        } catch (error) {
            console.log(JSON.stringify(error, null, 4));
            return false;
        }
    }
}
