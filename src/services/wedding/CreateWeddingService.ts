import { AppError } from "../../errors/AppError";
import { WeddingRepository } from "../../repositories/wedding/WeddingRepository";

interface IRequest {
  couple_name: string
  wedding_date: Date
  budget: number
  user_id: string
};

export class CreateWeddingService {
  async execute({
    couple_name,
    wedding_date,
    budget,
    user_id
  }: IRequest) {
    const repository = new WeddingRepository();
    const weddingAlreadyExists = await repository.findByUserId(user_id);

    if (weddingAlreadyExists) {
      throw new AppError(
        "User already has a wedding",
        409
      );
    };

    const wedding = await repository.create({
        couple_name,
        wedding_date,
        budget,
        user_id
      } as any);

    return wedding;
  };
};