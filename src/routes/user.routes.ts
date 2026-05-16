import { Router } from "express"
import { CreateUserController } from "../controller/user/CreateUserController"
import { LoginUserController } from "../controller/user/LoginUserController"
import { ProfileController } from "../controller/user/ProfileController"
import { authMiddleware } from "../middlewares/authMiddleware"
const userRoutes = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()
const profileController = new ProfileController()

userRoutes.post("/register", createUserController.handle)
userRoutes.post("/login", loginUserController.handle)
userRoutes.get("/profile", authMiddleware, profileController.handle)

export { userRoutes }
