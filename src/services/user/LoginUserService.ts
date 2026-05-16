import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories/user/UserRepository";

interface IRequest {
	email: string;
	password: string;
}

export class LoginUserService {
	async execute({ email, password }: IRequest) {
		const repository = new UserRepository();
		const user = await repository.findByEmail(email);

		if (!user) {
			throw new Error("Email or password invalid");
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email or password invalid");
		}

		const token = jwt.sign(
			{
				id: user.id,
				sequence_id: user.sequence_id,
				name: user.name,
				email: user.email,
			},
			process.env.JWT_SECRET as string,
			{
				expiresIn: "7d",
			},
		);

		return {token, user: {
			id: user.id,
			name: user.name,
			email: user.email,
			created_at: user.created_at,
			updated_at: user.updated_at,
		}};
	}
}
