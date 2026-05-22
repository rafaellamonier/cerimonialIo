import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const isNeon = !!process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
	type: "postgres",

	...(isNeon
		? {
				url: process.env.DATABASE_URL,
				ssl: { rejectUnauthorized: false },
		  }
		: {
				host: process.env.DB_HOST,
				port: Number(process.env.DB_PORT),
				username: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
		  }),

	synchronize: true,

	logging: false,

	entities: ["src/entities/*.ts"],
	migrations: ["src/database/migrations/*.ts"],
});
