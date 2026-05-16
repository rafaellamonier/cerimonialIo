import { z } from "zod";

export const updateSupplierStatusSchema = z.object({
    status: z.enum([
        "pending",
        "negotiating",
        "hired"
    ])
});