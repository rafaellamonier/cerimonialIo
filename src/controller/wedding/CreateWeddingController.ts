import { Request, Response } from "express";
import { createWeddingSchema } from "../../schemas/wedding/createWeddingSchema";
import { CreateWeddingService } from "../../services/wedding/CreateWeddingService";

export class CreateWeddingController {
  async handle(req: Request, res: Response) {
    const validatedData = createWeddingSchema.parse(req.body);
    const service = new CreateWeddingService();

    const result = await service.execute({
      ...validatedData,
      user_id: req.user.id,
      wedding_date: new Date(validatedData.wedding_date)
    });

    return res.status(201).json(result)
  };
};