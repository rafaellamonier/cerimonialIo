import { AppError } from "../../errors/AppError";
import { WeddingRepository } from "../../repositories/wedding/WeddingRepository";
import { SupplierRepository } from "../../repositories/supplier/SupplierRepository";

interface IRequest {
  name: string
  category: string
  value: number | null
  status: string
  user_id: string
};

export class CreateSupplierService {
  async execute(data: IRequest) {
    const weddingRepository = new WeddingRepository()
    const supplierRepository = new SupplierRepository()

    const wedding = await weddingRepository.findByUserId(data.user_id);

    if (!wedding) {
      throw new AppError(
        "Wedding not found",
        404
      )
    };

    const supplier =
      await supplierRepository.create({...data, wedding_id: wedding.id
    } as any);

    return supplier;
  };
};