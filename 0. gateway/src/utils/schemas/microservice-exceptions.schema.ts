import { z } from 'zod';

export const microserviceExceptionSchema = z.object({
  response: z.object({
    statusCode: z.number(),
    error: z.string().optional(),
    message: z.string().or(z.array(z.string())),
  }),
  status: z.number(),
});

export type MicroserviceException = z.infer<typeof microserviceExceptionSchema>;
