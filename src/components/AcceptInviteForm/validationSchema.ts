import { z } from "zod";

export const acceptInviteValidationSchema = z.object({
  name: z.string().min(2, "Seu nome deve conter pelo menos 2 caracteres"),
  password: z.string().min(8, "Sua senha deve conter pelo menos 8 caracteres"),
});
