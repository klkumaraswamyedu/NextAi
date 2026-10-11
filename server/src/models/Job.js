import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
      enum: ['STUDENT', 'GOVERNMENT']
    },
    query: {
      type: String,
      default: ''
    },
    filters: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    status: {
      type: String,
      required: true,
      enum: ['PENDING', 'RUNNING', 'COMPLETED', 'PARTIAL', 'FAILED', 'CANCELLED'],
      default: 'PENDING'
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    currentStage: {
      type: String,
      default: 'INITIALIZING'
    },
    resultCount: {
      type: Number,
      default: 0
    },
    errorMessage: {
      type: String,
      default: null
    },
    resultsSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      default: []
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

jobSchema.index({ status: 1, createdAt: -1 });

export const SearchJob = mongoose.model('SearchJob', jobSchema);
