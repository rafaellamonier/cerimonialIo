import { describe, it, expect, vi } from "vitest";
vi.mock("../../../src/repositories/wedding/WeddingRepository");
import { CreateWeddingService } from "../../../src/services/wedding/CreateWeddingService";
import { WeddingRepository } from "../../../src/repositories/wedding/WeddingRepository";

describe("CreateWeddingService", () => {
	it("should create a wedding", async () => {
		vi.mocked(WeddingRepository.prototype.findByUserId).mockResolvedValue(null);
		vi.mocked(WeddingRepository.prototype.create).mockResolvedValue({
			id: 1,
			couple_name: "Rafael e Ana",
			wedding_date: new Date(),
			budget: 50000,
			user_id: "123",
			user: {} as any,
			created_at: new Date(),
			updated_at: new Date(),
			suppliers: [],
		})

    	const service = new CreateWeddingService();

		const result = await service.execute({
			couple_name: "Rafael e Ana",
			wedding_date: new Date(),
			budget: 50000,
			user_id: "123",
		});

		expect(result).toHaveProperty("id");	
	});

	it ("should not create a wedding if user already has one", async () => {
		vi.mocked(WeddingRepository.prototype.findByUserId).mockResolvedValue({
			id: 1,
			couple_name: "Rafael e Ana",
			wedding_date: new Date(),
			budget: 50000,
			user_id: "123",
			user: {} as any,
			created_at: new Date(),
			updated_at: new Date(),
			suppliers: [],
		});

		const service = new CreateWeddingService();

		await expect(service.execute({
			couple_name: "Rafael e Ana",
			wedding_date: new Date(),
			budget: 50000,
			user_id: "123",
		})).rejects.toThrow("User already has a wedding");
	});
});

