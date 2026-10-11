import { z } from 'zod';

export const studentSearchSchema = z.object({
  category: z
    .enum(['INTERNSHIP', 'HACKATHON', 'RESEARCH', 'SCHOLARSHIP', 'ALL'])
    .default('INTERNSHIP'),
  skills: z.array(z.string().min(1)).default([]),
  degree: z.string().optional().default('Undergraduate'),
  academicYear: z.number().int().min(1).max(5).optional().default(3),
  location: z.string().optional().default(''),
  isRemote: z.boolean().optional().default(false)
});

export const saveStudentOpportunitySchema = z.object({
  opportunityId: z.string().min(1, 'Opportunity ID is required'),
  opportunitySnapshot: z.record(z.any()).optional()
});
