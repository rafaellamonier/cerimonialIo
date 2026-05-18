import { AppDataSource } from "../../config/data-source";
import { Wedding } from "../../entities/Wedding";

export class WeddingRepository {
  private repository = AppDataSource.getRepository(Wedding);

  async findByUserId(user_id: string) {

    console.log("Finding wedding by user_id:", user_id); // Debug log
    
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