import { SearchJob } from '../../models/Job.js';
import { isDbConnected } from '../../config/db.js';

// In-memory fallback for local dev/testing without active MongoDB instance
const memoryJobs = new Map();

export const jobStore = {
  async createJob(serviceType, filters, query = '') {
    const jobData = {
      serviceType,
      query,
      filters,
      status: 'COMPLETED',
      progress: 100,
      currentStage: 'READY_DEV_FIXTURE',
      resultCount: 0,
      resultsSnapshot: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (isDbConnected()) {
      try {
        const job = await SearchJob.create(jobData);
        return job;
      } catch (err) {
        console.warn('[JobStore] DB save failed, using memory fallback:', err.message);
      }
    }

    const mockId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const job = { _id: mockId, id: mockId, ...jobData };
    memoryJobs.set(mockId, job);
    return job;
  },

  async getJob(jobId) {
    if (isDbConnected()) {
      try {
        const job = await SearchJob.findById(jobId);
        if (job) return job;
      } catch (err) {
        // Fallback to memory
      }
    }
    return memoryJobs.get(jobId) || null;
  },

  async updateJob(jobId, updates) {
    if (isDbConnected()) {
      try {
        const job = await SearchJob.findByIdAndUpdate(jobId, updates, { new: true });
        if (job) return job;
      } catch (err) {
        // Fallback to memory
      }
    }
    const existing = memoryJobs.get(jobId);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    memoryJobs.set(jobId, updated);
    return updated;
  }
};
