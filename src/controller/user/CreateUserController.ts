import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";
import { createUserSchema } from "../../schemas/user/createUserSchema";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const validatedData = createUserSchema.parse(req.body);
    const service = new CreateUserService();
    const result = await service.execute(validatedData);

    return res.status(201).json(result);
  }
}