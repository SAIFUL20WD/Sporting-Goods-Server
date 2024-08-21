import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd() + "/.env") });

export default {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    Node_ENV: process.env.NODE_ENV,
    SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
