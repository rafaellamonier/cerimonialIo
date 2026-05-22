import { describe, expect, it, vi } from "vitest";
import { UserRepository } from "../../../src/repositories/user/UserRepository";
import { CreateUserService } from "../../../src/services/user/CreateUserService";
vi.mock("../../../src/repositories/user/UserRepository");

describe("CreateUserService", () => {
  it("should create a user and return without password", async () => {
    vi.mocked(UserRepository.prototype.findByEmail).mockResolvedValue(null);
    vi.mocked(UserRepository.prototype.create).mockResolvedValue({
      id: "uuid-123",
      sequence_id: 1,
      name: "Rafael",
      email: "rafael@email.com",
      password: "hashed_password",
      created_at: new Date(),
      updated_at: new Date(),
      wedding: {} as any,
    });

    const service = new CreateUserService();
    const result = await service.execute({
      name: "Rafael",
      email: "rafael@email.com",
      password: "123456",
    });

    expect(result).toHaveProperty("id");
    expect(result).not.toHaveProperty("password");
  });

  it("should throw an error if email is already in use", async () => {
    vi.mocked(UserRepository.prototype.findByEmail).mockResolvedValue({
      id: "uuid-123",
      sequence_id: 1,
      name: "Rafael",
      email: "rafael@email.com",
      password: "hashed_password",
      created_at: new Date(),
      updated_at: new Date(),
      wedding: {} as any,
    });

    const service = new CreateUserService();

    await expect(
      service.execute({
        name: "Rafael",
        email: "rafael@email.com",
        password: "123456",
      }),
    ).rejects.toThrow("Email já está em uso");
  });
});
