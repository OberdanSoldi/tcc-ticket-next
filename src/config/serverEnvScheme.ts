import { z } from "zod";

const envSchema = z.object({
  INTERNAL_API_URL: z.string().url(),
  EXTERNAL_API_URL: z.string().url(),
});

const serverEnvSchema = envSchema.safeParse(process.env);

if (!serverEnvSchema.success) {
  console.error(serverEnvSchema.error.issues);
  throw new Error("There is an error with the server environment variables");
}

export const { INTERNAL_API_URL, EXTERNAL_API_URL } = serverEnvSchema.data;
