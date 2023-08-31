import z from "zod";

const envSchema = z.object({
  EXTERNAL_API_URL: z.string().url(),
  INTERNAL_API_URL: z.string().url(),
});

const clientEnvSchema = envSchema.parse({
  INTERNAL_API_URL: process.env.INTERNAL_API_URL!,
  EXTERNAL_API_URL: process.env.EXTERNAL_API_URL!,
});

export const { INTERNAL_API_URL, EXTERNAL_API_URL } = clientEnvSchema;
