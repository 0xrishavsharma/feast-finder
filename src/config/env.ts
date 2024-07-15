import { config as dotenvConfig } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { cleanEnv, num, str } from "envalid";

const __dirnameConfig = path.dirname(fileURLToPath(import.meta.url));

dotenvConfig({
    path: path.join(__dirnameConfig, `../../.env.${process.env.NODE_ENV}`),
});

const env = cleanEnv(process.env, {
    PORT: num(),
    NODE_ENV: str({ choices: ["development", "test", "production"] }),
    DB_HOST: str(),
    DB_PORT: num(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
});

export default env;
