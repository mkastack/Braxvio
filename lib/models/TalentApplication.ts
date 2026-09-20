import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITalentApplication extends Document {
  name: string;
  email: string;
  message: string;
  location?: string;
  discipline?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
  status: 'received' | 'under_review' | 'shortlisted' | 'contacted' | 'declined';
  emailNotificationStatus?: {
    internalSent: boolean;
    confirmationSent: boolean;
    lastError?: string | null;
    processedAt?: Date | null;
  };
  createdAt: Date;
  updatedAt: Date;
  referenceCode: string;
}

const talentApplicationSchema = new Schema<ITalentApplication>(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [10000, 'Message cannot exceed 10000 characters'],
    },
    location: { type: String, trim: true },
    discipline: { type: String, trim: true, default: 'Engineering' },
    portfolio: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    github: { type: String, trim: true },
    status: {
      type: String,
      enum: ['received', 'under_review', 'shortlisted', 'contacted', 'declined'],
      default: 'received',
      index: true,
    },
    emailNotificationStatus: {
      internalSent: { type: Boolean, default: false },
      confirmationSent: { type: Boolean, default: false },
      lastError: { type: String, default: null },
      processedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

talentApplicationSchema.virtual('referenceCode').get(function () {
  const year = this.createdAt ? this.createdAt.getFullYear().toString() : new Date().getFullYear().toString();
  const suffix = this._id ? this._id.toString().slice(-6).toUpperCase() : '000000';
  return `BX-TLT-${year}-${suffix}`;
});

talentApplicationSchema.set('toJSON', { virtuals: true });
talentApplicationSchema.set('toObject', { virtuals: true });

export const TalentApplication: Model<ITalentApplication> =
  mongoose.models.TalentApplication ||
  mongoose.model<ITalentApplication>('TalentApplication', talentApplicationSchema);

export default TalentApplication;
