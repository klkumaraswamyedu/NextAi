import { Router } from 'express';
import { validateRequest } from '../middleware/validate.middleware.js';
import { governmentSearchSchema, saveSchemeSchema } from '../validators/government.schema.js';
import { jobIdParamSchema } from '../validators/job.schema.js';
import {
  searchGovernmentSchemes,
  getGovernmentJobResults,
  getSchemeById,
  saveGovernmentScheme,
  getSavedSchemes
} from '../controllers/government.controller.js';

const router = Router();

// POST /api/government/search - Initiate scheme search
router.post('/search', validateRequest(governmentSearchSchema, 'body'), searchGovernmentSchemes);

// GET /api/government/search/:jobId - Retrieve job results
router.get('/search/:jobId', validateRequest(jobIdParamSchema, 'params'), getGovernmentJobResults);

// GET /api/government/schemes/:id - Retrieve specific scheme details
router.get('/schemes/:id', getSchemeById);

// POST /api/government/saved - Bookmark a scheme
router.post('/saved', validateRequest(saveSchemeSchema, 'body'), saveGovernmentScheme);

// GET /api/government/saved - List bookmarked schemes
router.get('/saved', getSavedSchemes);

export default router;
