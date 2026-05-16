import { Request, Response } from "express";
import { GetWeddingService } from "../../services/wedding/GetWeddingService";

export class GetWeddingController {
  async handle(req: Request, res: Response) {
    const service = new GetWeddingService();
    const result = await service.execute(req.user.id);  
      
    return res.json(result)
  }
}