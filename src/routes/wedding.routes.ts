import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CreateWeddingController } from "../controller/wedding/CreateWeddingController";
import { GetWeddingController } from "../controller/wedding/GetWeddingController";

const weddingRoutes = Router();

const createWeddingController = new CreateWeddingController();
const getWeddingController = new GetWeddingController();

weddingRoutes.post("/", authMiddleware, createWeddingController.handle);
weddingRoutes.get("/me", authMiddleware, getWeddingController.handle);

export { weddingRoutes }