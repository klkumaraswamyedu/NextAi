import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SearchJob',
      default: null
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    officialUrl: {
      type: String,
      required: true
    },
    state: {
      type: String,
      default: 'All India'
    },
    eligibilityRules: [
      {
        ruleId: { type: String, required: true },
        description: { type: String, required: true },
        evidenceExcerpt: { type: String, default: null },
        status: {
          type: String,
          enum: ['SATISFIED', 'NOT_SATISFIED', 'UNKNOWN'],
          default: 'UNKNOWN'
        }
      }
    ],
    requiredDocuments: [
      {
        type: String,
        trim: true
      }
    ],
    applicationInstructions: {
      type: String,
      default: ''
    },
    deadline: {
      type: Date,
      default: null
    },
    deadlineRaw: {
      type: String,
      default: null
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'UNVERIFIED', 'CONFLICTING', 'UNKNOWN', 'STALE'],
      default: 'UNVERIFIED'
    },
    lastCheckedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

schemeSchema.index({ state: 1 });
schemeSchema.index({ officialUrl: 1 });

export const Scheme = mongoose.model('Scheme', schemeSchema);
