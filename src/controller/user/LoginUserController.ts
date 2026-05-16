import { Request, Response } from "express";
import { LoginUserService } from "../../services/user/LoginUserService";
import { createUserSchema } from "../../schemas/user/createUserSchema";

export class LoginUserController {
  async handle(
    req: Request,
    res: Response
  ) {
    const validatedData = createUserSchema.parse(req.body);
    const service = new LoginUserService();
    const result = await service.execute(validatedData);

    return res.json(result);
  }
}