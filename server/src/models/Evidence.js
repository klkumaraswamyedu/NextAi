import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      required: true,
      enum: ['OPPORTUNITY', 'SCHEME']
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    sourceUrl: {
      type: String,
      required: true
    },
    supportingExcerpt: {
      type: String,
      required: true
    },
    exactMatchFound: {
      type: Boolean,
      default: false
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1,
      default: 1.0
    },
    verificationStatus: {
      type: String,
      enum: ['VERIFIED', 'UNVERIFIED', 'CONFLICTING', 'UNKNOWN', 'STALE'],
      default: 'UNVERIFIED'
    },
    retrievedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

evidenceSchema.index({ entityId: 1, field: 1 });

export const SourceEvidence = mongoose.model('SourceEvidence', evidenceSchema);
