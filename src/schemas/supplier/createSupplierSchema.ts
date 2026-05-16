import { z } from "zod"

export const createSupplierSchema = z.object({
  name: z.string("Nome Obrigatório").min(1, "Name is required"),
  category: z.string("Categoria Obrigatória").min(1, "Category is required"),
  value: z.number("Valor Obrigatório").nullable(),
  status: z.enum([
    "pending",
    "negotiating",
    "hired"
  ])
})