import { Router } from "express";
import { CreateUserController } from "../controller/user/CreateUserController";
import { LoginUserController } from "../controller/user/LoginUserController";
import { ProfileController } from "../controller/user/ProfileController";
import { CreateSupplierController } from "../controller/supplier/CreateSupplierController";
import { authMiddleware } from "../middlewares/authMiddleware";
const userRoutes = Router();

const createUserController = new CreateUserController();
const loginUserController = new LoginUserController();
const profileController = new ProfileController();
const createSupplierController = new CreateSupplierController();

userRoutes.post("/register", createUserController.handle);
userRoutes.post("/login", loginUserController.handle);
userRoutes.get("/profile", authMiddleware, profileController.handle);
userRoutes.post("/suppliers", authMiddleware, createSupplierController.handle);

export { userRoutes };
