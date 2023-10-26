import z from "zod";

const envSchema = z.object({
  EXTERNAL_API_URL: z.string().url(),
});

const clientEnvSchema = envSchema.parse({
  EXTERNAL_API_URL: process.env.EXTERNAL_API_URL!,
});

export const { EXTERNAL_API_URL } = clientEnvSchema;
