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

	synchronize: false,

	logging: false,

	// entities: [User, Wedding, Supplier],

	entities: [
		process.env.NODE_ENV === "production"
			? "dist/entities/*.js"
			: "src/entities/*.ts"
	],
	migrations: [
		process.env.NODE_ENV === "production"
			? "dist/database/migrations/*.js"
			: "src/database/migrations/*.ts"
	],
	ssl: {
  		rejectUnauthorized: false
	}
});
