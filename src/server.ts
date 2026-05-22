import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 3333

AppDataSource.initialize()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
