import { AppDataSource } from "../../config/data-source";
import { Supplier } from "../../entities/Supplier";

export class SupplierRepository {
  private repository = AppDataSource.getRepository(Supplier);

  async create(data: Supplier) {
    const supplier = this.repository.create(data);

    return this.repository.save(supplier);
  };

  async findByWeddingId(wedding_id: number) {
    return this.repository.find({
      where: {
        wedding_id
      },
      order: {
        created_at: "DESC"
      }
    });
  };

  async findById(id: number) {
    return this.repository.findOne({ where: { id } });
  };

  async save(supplier: Supplier) {
    return this.repository.save(supplier);
  };

  async delete(id: number) {
    return this.repository.delete(id);
  };
};