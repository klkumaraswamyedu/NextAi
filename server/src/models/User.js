import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null
    },
    role: {
      type: String,
      enum: ['GUEST', 'USER', 'ADMIN'],
      default: 'GUEST'
    },
    profile: {
      educationLevel: { type: String, default: 'Undergraduate' },
      degree: { type: String, default: 'Computer Science' },
      academicYear: { type: Number, default: 3 },
      skills: [{ type: String }],
      preferredLocation: { type: String, default: 'Bengaluru' },
      state: { type: String, default: 'Karnataka' },
      remotePreference: { type: Boolean, default: true }
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model('User', userSchema);
