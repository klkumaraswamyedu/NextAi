import { jobStore } from '../services/store/jobStore.js';
import { AppError } from '../middleware/error.middleware.js';

export const getJobStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await jobStore.getJob(jobId);

    if (!job) {
      throw new AppError(`Search job with ID '${jobId}' not found`, 404, 'JOB_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: {
        jobId: job._id || job.id,
        serviceType: job.serviceType,
        status: job.status,
        progress: job.progress,
        currentStage: job.currentStage,
        resultCount: job.resultCount,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};
