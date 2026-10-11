import { Router } from 'express';
import { validateRequest } from '../middleware/validate.middleware.js';
import { studentSearchSchema, saveStudentOpportunitySchema } from '../validators/student.schema.js';
import { jobIdParamSchema } from '../validators/job.schema.js';
import {
  searchStudentOpportunities,
  getStudentJobResults,
  getOpportunityById,
  saveStudentOpportunity,
  getSavedOpportunities
} from '../controllers/student.controller.js';

const router = Router();

// POST /api/student/search - Initiate search
router.post('/search', validateRequest(studentSearchSchema, 'body'), searchStudentOpportunities);

// GET /api/student/search/:jobId - Retrieve job results
router.get('/search/:jobId', validateRequest(jobIdParamSchema, 'params'), getStudentJobResults);

// GET /api/student/opportunities/:id - Get specific opportunity details
router.get('/opportunities/:id', getOpportunityById);

// POST /api/student/saved - Save opportunity
router.post('/saved', validateRequest(saveStudentOpportunitySchema, 'body'), saveStudentOpportunity);

// GET /api/student/saved - List saved opportunities
router.get('/saved', getSavedOpportunities);

export default router;
