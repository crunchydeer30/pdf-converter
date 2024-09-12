import { z } from "zod";

export const envSchema = z.object({
  API_GATEWAY: z.string(),
});

export const env = envSchema.parse({
  API_GATEWAY: process.env.NEXT_PUBLIC_API_GATEWAY,
});
