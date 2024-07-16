import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import env from "./env";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: env.NODE_ENV === "development" || env.NODE_ENV === "test", //don't set it to true in production, as this option syncs models to the db, and if a new model is created it will create tables in db in real-time that can cause issues
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
});
