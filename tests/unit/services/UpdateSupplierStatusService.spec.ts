import { describe, expect, it, vi } from "vitest";
import { Wedding } from "../../../src/entities/Wedding";
import { SupplierRepository } from "../../../src/repositories/supplier/SupplierRepository";
import { UpdateSupplierStatusService } from "../../../src/services/supplier/UpdateSupplierStatusService";
vi.mock("../../../src/repositories/supplier/SupplierRepository");

describe("UpdateSupplierStatusService", () => {
  it("should update the status of a supplier", async () => {
    const supplier = {
      id: 1,
      name: "Supplier 1",
      category: "Photography",
      value: 5000,
      status: "pending",
      wedding_id: 1,
      wedding: new Wedding(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    vi.mocked(SupplierRepository.prototype.findById).mockResolvedValue(supplier);
    vi.mocked(SupplierRepository.prototype.save).mockResolvedValue({
      ...supplier,
      status: "approved",
    });

    const service = new UpdateSupplierStatusService();
    const result = await service.execute(1, "approved");

    expect(result.status).toBe("approved");
  });

  it("should throw an error if supplier is not found", async () => {
    vi.mocked(SupplierRepository.prototype.findById).mockResolvedValue(null);

    const service = new UpdateSupplierStatusService();

    await expect(service.execute(1, "approved")).rejects.toThrow("Supplier not found");
  });
});
