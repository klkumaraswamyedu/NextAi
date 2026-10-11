import mongoose from 'mongoose';

const savedItemSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'guest_user'
    },
    itemType: {
      type: String,
      required: true,
      enum: ['OPPORTUNITY', 'SCHEME']
    },
    itemId: {
      type: String,
      required: true
    },
    itemSnapshot: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    savedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

savedItemSchema.index({ userId: 1, itemType: 1, itemId: 1 }, { unique: true });

export const SavedItem = mongoose.model('SavedItem', savedItemSchema);
