import bcrypt from "bcryptjs";
import { UserRepository } from "../../repositories/user/UserRepository";
import { AppError } from "../../errors/AppError";

interface IRequest {
	name: string;
	email: string;
	password: string;
}

export class CreateUserService {
	async execute({ name, email, password }: IRequest) {
		const repository = new UserRepository();
		const userAlreadyExists = await repository.findByEmail(email);
		const hashedPassword = await bcrypt.hash(password, 10);

		if (userAlreadyExists) {
			throw new AppError(
				"Email já está em uso",
				409
			);
		}

		const user = await repository.create({
			name,
			email,
			password: hashedPassword,
		});

		const { password: _, ...userWithoutPassword } = user;

		return userWithoutPassword;
	}
}
