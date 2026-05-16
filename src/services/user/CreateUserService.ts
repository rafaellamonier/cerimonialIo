import bcrypt from "bcryptjs";
import { UserRepository } from "../../repositories/user/UserRepository";

interface IRequest {
	name: string;
	email: string;
	password: string;
}

export class CreateUserService {
	async execute({ name, email, password }: IRequest) {
		const repository = new UserRepository();
		const userAlreadyExists = await repository.findByEmail(email);

		if (userAlreadyExists) {
			throw new Error("User already exists");
		}

		const hashePassword = await bcrypt.hash(password, 10);

		const user = await repository.create({
			name,
			email,
			password: hashePassword,
		});

		return user;
	}
}
