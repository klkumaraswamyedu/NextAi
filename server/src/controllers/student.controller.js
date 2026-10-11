import { DEV_STUDENT_OPPORTUNITIES } from '../fixtures/developmentFixtures.js';
import { jobStore } from '../services/store/jobStore.js';
import { AppError } from '../middleware/error.middleware.js';
import { SavedItem } from '../models/SavedItem.js';
import { isDbConnected } from '../config/db.js';

// In-memory saved opportunities fallback
const memorySavedItems = new Map();

export const searchStudentOpportunities = async (req, res, next) => {
  try {
    const filters = req.body;
    const query = filters.skills ? filters.skills.join(', ') : 'Student Opportunities';

    // Filter dev fixtures by category if specified and not 'ALL'
    let matchedResults = [...DEV_STUDENT_OPPORTUNITIES];
    if (filters.category && filters.category !== 'ALL') {
      matchedResults = matchedResults.filter((opp) => opp.category === filters.category);
    }
    if (filters.isRemote) {
      matchedResults = matchedResults.filter((opp) => opp.remote);
    }

    // Create job record
    const job = await jobStore.createJob('STUDENT', filters, query);
    await jobStore.updateJob(job._id || job.id, {
      status: 'COMPLETED',
      progress: 100,
      currentStage: 'FIXTURE_RESULTS_READY',
      resultCount: matchedResults.length,
      resultsSnapshot: matchedResults
    });

    res.status(202).json({
      success: true,
      data: {
        jobId: job._id || job.id,
        status: 'COMPLETED',
        message: 'Search completed with development fixtures (TinyFish live retrieval scheduled for Phase 3).',
        isDevelopmentMode: true
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentJobResults = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await jobStore.getJob(jobId);

    if (!job) {
      throw new AppError(`Search job not found for ID: ${jobId}`, 404, 'JOB_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: {
        jobId: job._id || job.id,
        serviceType: 'STUDENT',
        status: job.status,
        progress: job.progress,
        currentStage: job.currentStage,
        resultCount: job.resultCount,
        opportunities: job.resultsSnapshot || DEV_STUDENT_OPPORTUNITIES,
        isDevelopmentMode: true,
        notice: 'Displaying clearly identified development fixtures. Live extraction enabled in later phase.'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getOpportunityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const opp = DEV_STUDENT_OPPORTUNITIES.find((item) => item.id === id);

    if (!opp) {
      throw new AppError(`Opportunity not found for ID: ${id}`, 404, 'NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: opp
    });
  } catch (error) {
    next(error);
  }
};

export const saveStudentOpportunity = async (req, res, next) => {
  try {
    const { opportunityId, opportunitySnapshot } = req.body;
    const oppToSave =
      opportunitySnapshot ||
      DEV_STUDENT_OPPORTUNITIES.find((item) => item.id === opportunityId) ||
      { id: opportunityId, title: 'Opportunity' };

    const savedRecord = {
      userId: 'guest_user',
      itemType: 'OPPORTUNITY',
      itemId: opportunityId,
      itemSnapshot: oppToSave,
      savedAt: new Date()
    };

    if (isDbConnected()) {
      try {
        await SavedItem.findOneAndUpdate(
          { userId: 'guest_user', itemType: 'OPPORTUNITY', itemId: opportunityId },
          savedRecord,
          { upsert: true, new: true }
        );
      } catch (err) {
        console.warn('[SavedItem DB Warning]', err.message);
      }
    }

    memorySavedItems.set(`OPPORTUNITY_${opportunityId}`, savedRecord);

    res.status(201).json({
      success: true,
      data: {
        message: 'Opportunity successfully saved to bookmarks.',
        savedItem: savedRecord
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedOpportunities = async (req, res, next) => {
  try {
    let items = [];

    if (isDbConnected()) {
      try {
        items = await SavedItem.find({ userId: 'guest_user', itemType: 'OPPORTUNITY' });
      } catch (err) {
        console.warn('[SavedItem DB Query Warning]', err.message);
      }
    }

    if (items.length === 0) {
      items = Array.from(memorySavedItems.values()).filter(
        (item) => item.itemType === 'OPPORTUNITY'
      );
    }

    res.status(200).json({
      success: true,
      data: {
        count: items.length,
        savedOpportunities: items
      }
    });
  } catch (error) {
    next(error);
  }
};
