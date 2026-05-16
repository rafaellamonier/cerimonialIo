import { Router } from "express"

import { CreateUserController }
from "../controller/user/CreateUserController"

import { LoginUserController }
from "../controller/user/LoginUserController"

const userRoutes = Router()

const createUserController =
  new CreateUserController()

const loginUserController =
  new LoginUserController()

userRoutes.post(
  "/register",
  createUserController.handle
)

userRoutes.post(
  "/login",
  loginUserController.handle
)

export { userRoutes }