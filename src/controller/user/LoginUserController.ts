import { Request, Response } from "express";
import { LoginUserService } from "../../services/user/LoginUserService";
import { loginUserSchema } from "../../schemas/user/loginUserSchema";

export class LoginUserController {
  async handle(
    req: Request,
    res: Response
  ) {
    const validatedData = loginUserSchema.parse(req.body);
    const service = new LoginUserService();
    const result = await service.execute(validatedData);

    return res.json(result);
  }
}