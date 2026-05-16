import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string("Nome inválido").min(3, "Nome deve conter pelo menos 3 caracteres"),
  email: z.email("Email inválido"),
  password: z.string("Senha inválida").min(6, "Senha deve conter pelo menos 6 caracteres")
});