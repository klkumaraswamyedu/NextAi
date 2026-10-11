import { Router } from 'express';
import { validateRequest } from '../middleware/validate.middleware.js';
import { jobIdParamSchema } from '../validators/job.schema.js';
import { getJobStatus } from '../controllers/jobs.controller.js';

const router = Router();

// GET /api/jobs/:jobId - Unified job status polling
router.get('/:jobId', validateRequest(jobIdParamSchema, 'params'), getJobStatus);

export default router;
