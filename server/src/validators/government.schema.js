import { z } from 'zod';

export const governmentSearchSchema = z.object({
  educationLevel: z
    .enum(['SCHOOL', 'UNDERGRADUATE', 'POSTGRADUATE', 'DOCTORAL', 'ALL'])
    .default('UNDERGRADUATE'),
  state: z.string().default('All India'),
  category: z.string().optional().default('GENERAL'),
  familyIncome: z.number().nonnegative().optional()
});

export const saveSchemeSchema = z.object({
  schemeId: z.string().min(1, 'Scheme ID is required'),
  schemeSnapshot: z.record(z.any()).optional()
});
