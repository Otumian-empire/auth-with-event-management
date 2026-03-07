import jsonWebToken from "jsonwebtoken";
import { envConstants } from "../constants/eve-constants";

const { JWT_SECRET, JWT_TTL } = envConstants;

export class JWTService {
    static generateToken(userId: string) {
        return jsonWebToken.sign({ userId }, JWT_SECRET, {
            expiresIn: JWT_TTL,
        });
    }

    static verify(token: string) {
        return jsonWebToken.verify(token, JWT_SECRET) as { userId: string };
    }
}
