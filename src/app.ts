import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { userRoutes } from "./routes/user.routes";
import { weddingRoutes } from "./routes/wedding.routes";
import { supplierRoutes } from "./routes/supplier.routes";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:3333",
    "https://cerimonialio.vercel.app/dashboard.app"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/weddings", weddingRoutes);
app.use("/suppliers", supplierRoutes);
app.use(errorMiddleware);

app.get("/health", (req, res) => {
  return res.json({
    status: "ok"
  })
})

export { app };
