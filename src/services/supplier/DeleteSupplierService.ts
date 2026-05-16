import { AppError } from "../../errors/AppError";
import { SupplierRepository } from "../../repositories/supplier/SupplierRepository";

export class DeleteSupplierService {
  async execute(id: string) {
    const repository = new SupplierRepository();
    const supplier = await repository.findById(id);

    if (!supplier) {
      throw new AppError(
        "Supplier not found",
        404
      )
    };

    await repository.delete(id);
  };
};