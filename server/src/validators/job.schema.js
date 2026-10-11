import { z } from 'zod';

export const jobIdParamSchema = z.object({
  jobId: z.string().min(1, 'jobId is required')
});
