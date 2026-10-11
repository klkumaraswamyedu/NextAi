import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SearchJob',
      default: null
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    organization: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['INTERNSHIP', 'HACKATHON', 'RESEARCH', 'SCHOLARSHIP']
    },
    location: {
      type: String,
      default: 'Remote'
    },
    remote: {
      type: Boolean,
      default: false
    },
    eligibility: [
      {
        criteria: { type: String, required: true },
        evidenceExcerpt: { type: String, default: null },
        isVerified: { type: Boolean, default: false }
      }
    ],
    skills: [
      {
        type: String,
        trim: true
      }
    ],
    deadline: {
      type: Date,
      default: null
    },
    deadlineRaw: {
      type: String,
      default: null
    },
    sourceUrl: {
      type: String,
      required: true
    },
    applicationUrl: {
      type: String,
      default: null
    },
    relevanceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    scoreBreakdown: {
      eligibilityMatch: { type: Number, default: 0 },
      skillsMatch: { type: Number, default: 0 },
      careerRelevance: { type: Number, default: 0 },
      locationMatch: { type: Number, default: 0 },
      deadlineSuitability: { type: Number, default: 0 }
    },
    explanation: {
      type: String,
      default: ''
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'UNVERIFIED', 'CONFLICTING', 'UNKNOWN', 'STALE'],
      default: 'UNKNOWN'
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

opportunitySchema.index({ category: 1, relevanceScore: -1 });
opportunitySchema.index({ sourceUrl: 1 });

export const Opportunity = mongoose.model('Opportunity', opportunitySchema);
