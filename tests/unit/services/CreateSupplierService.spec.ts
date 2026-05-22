import { describe, expect, it, vi } from "vitest";
import { Wedding } from "../../../src/entities/Wedding";
import { SupplierRepository } from "../../../src/repositories/supplier/SupplierRepository";
import { WeddingRepository } from "../../../src/repositories/wedding/WeddingRepository";
import { CreateSupplierService } from "../../../src/services/supplier/CreateSupplierService";
vi.mock("../../../src/repositories/supplier/SupplierRepository.ts");
vi.mock("../../../src/repositories/wedding/WeddingRepository.ts");

describe("CreateSupplierService", () => {
	it("should create a Supplier", async () => {
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
		vi.mocked(SupplierRepository.prototype.create).mockResolvedValue({
			id: 1,
			name: "Supplier 1",
			category: "Photography",
			wedding_id: 1,
			created_at: new Date(),
			updated_at: new Date(),
			value: 0,
			status: "",
			wedding: new Wedding()
		});

		const service = new CreateSupplierService();

		const result = await service.execute({
			name: "Supplier 1",
			category: "Photography",
			value: 0,
			status: "",
			user_id: "123",
		})

		expect(result).toHaveProperty("id");
	});

	it("Should create a Supplier if user has a wedding", async () => {
		vi.mocked(WeddingRepository.prototype.findByUserId).mockResolvedValue(null);

		const service = new CreateSupplierService();

		await expect(
			service.execute({
				name: "Supplier 1",
				category: "Photography",
				value: 0,
				status: "",
				user_id: "123",
			}),
		).rejects.toThrow("Wedding not found");
	});
});
