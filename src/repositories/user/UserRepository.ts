import { AppDataSource } from "../../config/data-source";
import { User } from "../../entities/User";

export class UserRepository {
	private repository = AppDataSource.getRepository(User);

	async findByEmail(email: string) {
		return this.repository.findOne({
			where: { email },
		});
	}

	async create(data: {
		name: string;
		email: string;
		password: string;
	}) {
		const user = this.repository.create(data);

		return this.repository.save(user);
	}
}
