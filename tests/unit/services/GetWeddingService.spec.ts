import { describe, expect, it, vi } from "vitest";
import { WeddingRepository } from "../../../src/repositories/wedding/WeddingRepository";
import { GetWeddingService } from "../../../src/services/wedding/GetWeddingService";
vi.mock("../../../src/repositories/wedding/WeddingRepository");

describe("GetWeddingService", () => {
  it("should return the wedding for a given user", async () => {
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

    const service = new GetWeddingService();
    const result = await service.execute("123");

    expect(result).toHaveProperty("id");
    expect(result.user_id).toBe("123");
  });

  it("should throw an error if wedding is not found", async () => {
    vi.mocked(WeddingRepository.prototype.findByUserId).mockResolvedValue(null);

    const service = new GetWeddingService();

    await expect(service.execute("123")).rejects.toThrow("Wedding not found");
  });
});
