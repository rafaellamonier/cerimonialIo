import { AppError } from "../../errors/AppError";
import { WeddingRepository } from "../../repositories/wedding/WeddingRepository";

export class GetWeddingService {
  async execute(user_id: string) {
    const repository = new WeddingRepository();
    const wedding = await repository.findByUserId(user_id);

    if (!wedding) {
      throw new AppError(
        "Wedding not found",
        404
      )
    };

    return wedding;
  };
};