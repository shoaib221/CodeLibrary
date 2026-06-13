import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });    

const config = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USER: process.env.DB_USER || "user", 
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    DB_NAME: process.env.DB_NAME || "mydatabase",
};

export default config;

