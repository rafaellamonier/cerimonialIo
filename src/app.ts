import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { userRoutes } from "./routes/user.routes";
import { weddingRoutes } from "./routes/wedding.routes";
import { supplierRoutes } from "./routes/supplier.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/users", userRoutes);
app.use("/weddings", weddingRoutes);
app.use("/suppliers", supplierRoutes);
app.use(errorMiddleware);

export { app };
