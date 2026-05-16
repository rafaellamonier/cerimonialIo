import { Request, Response } from "express";
import { ListSuppliersService } from "../../services/supplier/ListSuppliersService";

export class ListSuppliersController {
  async handle(req: Request, res: Response) {
    const service = new ListSuppliersService();
    const result = await service.execute(req.user.id);

    return res.json(result);
  };
};