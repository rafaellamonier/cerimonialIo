import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
	.then(() => {
		console.log("Database connected");

		app.listen(3333, () => {
			console.log("Server running");
		});
	})
	.catch((error) => {
		console.log(error);
	});
