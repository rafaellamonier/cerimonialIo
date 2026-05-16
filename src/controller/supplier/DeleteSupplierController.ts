import { Request, Response } from "express";
import { DeleteSupplierService } from "../../services/supplier/DeleteSupplierService";

export class DeleteSupplierController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const service = [new DeleteSupplierService()];
    await service[0].execute(id as string);

    return res.status(204).send();
  };
};