import { AppError } from "../../errors/AppError";
import { WeddingRepository } from "../../repositories/wedding/WeddingRepository";
import { SupplierRepository } from "../../repositories/supplier/SupplierRepository";

export class ListSuppliersService {
  async execute(user_id: string) {
    const weddingRepository = new WeddingRepository();
    const supplierRepository = new SupplierRepository();

    const wedding = await weddingRepository.findByUserId(user_id);

    if (!wedding) {
      throw new AppError(
        "Wedding not found",
        404
      )
    };

    return supplierRepository.findByWeddingId(
      wedding.id
    );
  };
};