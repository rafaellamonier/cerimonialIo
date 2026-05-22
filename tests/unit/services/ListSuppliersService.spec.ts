import { describe, expect, it, vi } from "vitest";
import { Wedding } from "../../../src/entities/Wedding";
import { SupplierRepository } from "../../../src/repositories/supplier/SupplierRepository";
import { WeddingRepository } from "../../../src/repositories/wedding/WeddingRepository";
import { ListSuppliersService } from "../../../src/services/supplier/ListSuppliersService";
vi.mock("../../../src/repositories/supplier/SupplierRepository");
vi.mock("../../../src/repositories/wedding/WeddingRepository");

describe("ListSuppliersService", () => {
  it("should return suppliers for the user's wedding", async () => {
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

    vi.mocked(SupplierRepository.prototype.findByWeddingId).mockResolvedValue([
      {
        id: 1,
        name: "Supplier 1",
        category: "Photography",
        value: 5000,
        status: "pending",
        wedding_id: 1,
        wedding: new Wedding(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const service = new ListSuppliersService();
    const result = await service.execute("123");

    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id");
  });

  it("should throw an error if wedding is not found", async () => {
    vi.mocked(WeddingRepository.prototype.findByUserId).mockResolvedValue(null);

    const service = new ListSuppliersService();

    await expect(service.execute("123")).rejects.toThrow("Wedding not found");
  });
});
