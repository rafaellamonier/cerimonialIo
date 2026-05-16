import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { userRoutes } from "./routes/user.routes";
import { weddingRoutes } from "./routes/wedding.routes";
import { supplierRoutes } from "./routes/supplier.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/weddings", weddingRoutes);
app.use("/suppliers", supplierRoutes);
app.use(errorMiddleware);

export { app };