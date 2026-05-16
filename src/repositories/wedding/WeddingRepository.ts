import { AppDataSource } from "../../config/data-source";
import { Wedding } from "../../entities/Wedding";

export class WeddingRepository {
  private repository = AppDataSource.getRepository(Wedding);

  async findByUserId(user_id: string) {
    
    return this.repository.findOne({
      where: {
        user_id
      }
    });
  };

  async create(data: Wedding) {
    const wedding = this.repository.create(data);

    return this.repository.save(wedding);
  };
};