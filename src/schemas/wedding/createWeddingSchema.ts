import { z } from "zod";

export const createWeddingSchema = z.object({
  couple_name: z.string("Nome do casal é obrigatório").min(3, "Nome do casal deve ter pelo menos 3 caracteres"),
  wedding_date: z.string("Data do casamento é obrigatória"),
  budget: z.number("Orçamento é obrigatório").positive("Orçamento deve ser um número positivo"),
});