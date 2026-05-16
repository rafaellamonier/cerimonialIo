import "dotenv/config";
import { app } from "./app";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
	.then(() => {
		const port = process.env.PORT || 3333;
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
