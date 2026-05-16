import { Request, Response } from "express"
import { LoginUserService } from "../../services/user/LoginUserService"

export class LoginUserController {
  async handle(
    req: Request,
    res: Response
  ) {
    const { email, password } = req.body
    const service = new LoginUserService()
    const result = await service.execute({ email, password })

    return res.json(result)
  }
}