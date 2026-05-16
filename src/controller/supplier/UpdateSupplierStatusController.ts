import { Request, Response } from "express";
import { updateSupplierStatusSchema } from "../../schemas/supplier/updateSupplierStatusSchema";
import { UpdateSupplierStatusService } from "../../services/supplier/UpdateSupplierStatusService";

export class UpdateSupplierStatusController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const validatedData = updateSupplierStatusSchema.parse(req.body);
    const service = new UpdateSupplierStatusService();
    const result = await service.execute(Number(id), validatedData.status);

    return res.json(result);
  };
};