import express from "express";
import { userRoutes } from "./routes/user.routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use(errorMiddleware);

export { app };