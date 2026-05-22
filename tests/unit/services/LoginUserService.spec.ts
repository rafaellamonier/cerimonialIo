import { describe, expect, it, vi } from "vitest";
import { UserRepository } from "../../../src/repositories/user/UserRepository";
import { LoginUserService } from "../../../src/services/user/LoginUserService";
import bcrypt from "bcryptjs";
vi.mock("../../../src/repositories/user/UserRepository");

describe("LoginUserService", () => {
  it("should return a token and user data on valid credentials", async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);

    vi.mocked(UserRepository.prototype.findByEmail).mockResolvedValue({
      id: "uuid-123",
      sequence_id: 1,
      name: "Rafael",
      email: "rafael@email.com",
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
      wedding: {} as any,
    });

    const service = new LoginUserService();
    const result = await service.execute({
      email: "rafael@email.com",
      password: "123456",
    });

    expect(result).toHaveProperty("token");
    expect(result.user).toHaveProperty("id");
    expect(result.user).not.toHaveProperty("password");
  });

  it("should throw an error if user is not found", async () => {
    vi.mocked(UserRepository.prototype.findByEmail).mockResolvedValue(null);

    const service = new LoginUserService();

    await expect(
      service.execute({ email: "rafael@email.com", password: "123456" }),
    ).rejects.toThrow("Email ou senha inválidos");
  });

  it("should throw an error if password does not match", async () => {
    const hashedPassword = await bcrypt.hash("correct_password", 10);

    vi.mocked(UserRepository.prototype.findByEmail).mockResolvedValue({
      id: "uuid-123",
      sequence_id: 1,
      name: "Rafael",
      email: "rafael@email.com",
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
      wedding: {} as any,
    });

    const service = new LoginUserService();

    await expect(
      service.execute({ email: "rafael@email.com", password: "wrong_password" }),
    ).rejects.toThrow("Email ou senha inválidos");
  });
});
