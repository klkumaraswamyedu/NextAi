import { DEV_GOVERNMENT_SCHEMES } from '../fixtures/developmentFixtures.js';
import { jobStore } from '../services/store/jobStore.js';
import { AppError } from '../middleware/error.middleware.js';
import { SavedItem } from '../models/SavedItem.js';
import { isDbConnected } from '../config/db.js';

const memorySavedSchemes = new Map();

export const searchGovernmentSchemes = async (req, res, next) => {
  try {
    const filters = req.body;
    const query = `${filters.educationLevel} ${filters.state}`;

    let matchedSchemes = [...DEV_GOVERNMENT_SCHEMES];
    if (filters.state && filters.state !== 'All India') {
      matchedSchemes = matchedSchemes.filter(
        (s) => s.state.includes(filters.state) || s.state.includes('All India')
      );
    }

    const job = await jobStore.createJob('GOVERNMENT', filters, query);
    await jobStore.updateJob(job._id || job.id, {
      status: 'COMPLETED',
      progress: 100,
      currentStage: 'FIXTURE_SCHEMES_READY',
      resultCount: matchedSchemes.length,
      resultsSnapshot: matchedSchemes
    });

    res.status(202).json({
      success: true,
      data: {
        jobId: job._id || job.id,
        status: 'COMPLETED',
        message: 'Government scheme search completed with development fixtures.',
        isDevelopmentMode: true
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getGovernmentJobResults = async (req, res, next) => {
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
        serviceType: 'GOVERNMENT',
        status: job.status,
        progress: job.progress,
        currentStage: job.currentStage,
        resultCount: job.resultCount,
        schemes: job.resultsSnapshot || DEV_GOVERNMENT_SCHEMES,
        isDevelopmentMode: true,
        notice: 'Displaying development fixtures. Live government web extraction scheduled for Phase 3.'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSchemeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const scheme = DEV_GOVERNMENT_SCHEMES.find((s) => s.id === id);

    if (!scheme) {
      throw new AppError(`Government scheme not found for ID: ${id}`, 404, 'NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: scheme
    });
  } catch (error) {
    next(error);
  }
};

export const saveGovernmentScheme = async (req, res, next) => {
  try {
    const { schemeId, schemeSnapshot } = req.body;
    const schemeToSave =
      schemeSnapshot ||
      DEV_GOVERNMENT_SCHEMES.find((s) => s.id === schemeId) ||
      { id: schemeId, name: 'Scheme' };

    const savedRecord = {
      userId: 'guest_user',
      itemType: 'SCHEME',
      itemId: schemeId,
      itemSnapshot: schemeToSave,
      savedAt: new Date()
    };

    if (isDbConnected()) {
      try {
        await SavedItem.findOneAndUpdate(
          { userId: 'guest_user', itemType: 'SCHEME', itemId: schemeId },
          savedRecord,
          { upsert: true, new: true }
        );
      } catch (err) {
        console.warn('[SavedScheme DB Warning]', err.message);
      }
    }

    memorySavedSchemes.set(`SCHEME_${schemeId}`, savedRecord);

    res.status(201).json({
      success: true,
      data: {
        message: 'Government scheme successfully saved.',
        savedItem: savedRecord
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedSchemes = async (req, res, next) => {
  try {
    let items = [];

    if (isDbConnected()) {
      try {
        items = await SavedItem.find({ userId: 'guest_user', itemType: 'SCHEME' });
      } catch (err) {
        console.warn('[SavedScheme DB Query Warning]', err.message);
      }
    }

    if (items.length === 0) {
      items = Array.from(memorySavedSchemes.values()).filter(
        (item) => item.itemType === 'SCHEME'
      );
    }

    res.status(200).json({
      success: true,
      data: {
        count: items.length,
        savedSchemes: items
      }
    });
  } catch (error) {
    next(error);
  }
};
