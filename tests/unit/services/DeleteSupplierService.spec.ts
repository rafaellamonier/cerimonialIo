import { describe, expect, it, vi } from "vitest";
import { Wedding } from "../../../src/entities/Wedding";
import { SupplierRepository } from "../../../src/repositories/supplier/SupplierRepository";
import { DeleteSupplierService } from "../../../src/services/supplier/DeleteSupplierService";
vi.mock("../../../src/repositories/supplier/SupplierRepository");

describe("DeleteSupplierService", () => {
  it("should delete a supplier", async () => {
    vi.mocked(SupplierRepository.prototype.findById).mockResolvedValue({
      id: 1,
      name: "Supplier 1",
      category: "Photography",
      value: 5000,
      status: "pending",
      wedding_id: 1,
      wedding: new Wedding(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    vi.mocked(SupplierRepository.prototype.delete).mockResolvedValue({} as any);

    const service = new DeleteSupplierService();

    await expect(service.execute(1)).resolves.not.toThrow();
  });

  it("should throw an error if supplier is not found", async () => {
    vi.mocked(SupplierRepository.prototype.findById).mockResolvedValue(null);

    const service = new DeleteSupplierService();

    await expect(service.execute(1)).rejects.toThrow("Supplier not found");
  });
});
