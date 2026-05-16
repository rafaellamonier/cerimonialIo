import { Request, Response } from "express";
import { createSupplierSchema } from "../../schemas/supplier/createSupplierSchema";
import { CreateSupplierService } from "../../services/supplier/CreateSupplierService";

export class CreateSupplierController {
  async handle(req: Request, res: Response) {
    const validatedData = createSupplierSchema.parse(req.body);
    const service = new CreateSupplierService();
    const result = await service.execute({ ...validatedData, user_id: req.user.id });

    return res.status(201).json(result);
  };
};