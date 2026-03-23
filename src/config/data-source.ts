import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: process.env.DB_NAME || "calculatordb.sqlite",
    synchronize: false,
    logging: true,
    entities: [__dirname + "/../entity/**/*.ts"],
    migrations: [__dirname + "/../migration/**/*.ts"],
    subscribers: [],
});
