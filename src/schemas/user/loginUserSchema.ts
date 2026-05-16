import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string("Senha inválida").min(1, "Senha é obrigatória")
});