// import { config as dotenvConfig } from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import { cleanEnv, num, str } from "envalid";

// const __dirnameConfig = path.dirname(fileURLToPath(import.meta.url));

// dotenvConfig({
//     path: path.join(__dirnameConfig, `../../.env.${process.env.NODE_ENV}`),
// });

// const env = cleanEnv(process.env, {
//     PORT: num(),
//     NODE_ENV: str({ choices: ["development", "test", "production"] }),
//     DB_HOST: str(),
//     DB_PORT: num(),
//     DB_USERNAME: str(),
//     DB_PASSWORD: str(),
//     DB_NAME: str(),
// });

// export default env;

// Revised approach to avoid direct use of import.meta.url in a way that causes issues with tests
import { config as dotenvConfig } from "dotenv";
import path from "path";
import { cleanEnv, num, str } from "envalid";

// Assuming process.cwd() returns the project root directory correctly in your test environment
// Adjust the relative path as necessary to point to your .env file correctly
const rootDir = process.cwd();
const envPath = path.join(rootDir, `.env.${process.env.NODE_ENV}`);

dotenvConfig({
    path: envPath,
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
