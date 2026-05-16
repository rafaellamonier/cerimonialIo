import { AppError } from "../../errors/AppError";
import { SupplierRepository } from "../../repositories/supplier/SupplierRepository";

export class UpdateSupplierStatusService {
  async execute(id: number, status: string) {
    const repository = new SupplierRepository();
    const supplier = await repository.findById(id);

    if (!supplier) {
      throw new AppError(
        "Supplier not found",
        404
      )
    };

    supplier.status = status;

    return repository.save(supplier);
  };
}