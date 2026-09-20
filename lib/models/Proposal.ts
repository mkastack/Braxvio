import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProposal extends Document {
  fullName: string;
  email: string;
  companyName: string;
  proposalDetails: string;
  status: 'received' | 'under_review' | 'contacted' | 'accepted' | 'rejected';
  phone?: string;
  country?: string;
  website?: string;
  partnershipType?: string;
  proposalTitle?: string;
  targetProductId?: string;
  timeline?: string;
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

const proposalSchema = new Schema<IProposal>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters long'],
      maxlength: [120, 'Full name cannot exceed 120 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      minlength: [2, 'Company name must be at least 2 characters long'],
      maxlength: [150, 'Company name cannot exceed 150 characters'],
      index: true,
    },
    proposalDetails: {
      type: String,
      required: [true, 'Proposal details are required'],
      trim: true,
      minlength: [10, 'Proposal details must be at least 10 characters long'],
      maxlength: [10000, 'Proposal details cannot exceed 10000 characters'],
    },
    status: {
      type: String,
      enum: ['received', 'under_review', 'contacted', 'accepted', 'rejected'],
      default: 'received',
      index: true,
    },
    phone: { type: String, trim: true },
    country: { type: String, trim: true },
    website: { type: String, trim: true },
    partnershipType: { type: String, trim: true },
    proposalTitle: { type: String, trim: true },
    targetProductId: { type: String, trim: true },
    timeline: { type: String, trim: true },
    emailNotificationStatus: {
      internalSent: { type: Boolean, default: false },
      confirmationSent: { type: Boolean, default: false },
      lastError: { type: String, default: null },
      processedAt: { type: Date, default: null },
    },
  },
  {
    timestamps: true,
  }
);

proposalSchema.virtual('referenceCode').get(function () {
  const dateStr = this.createdAt ? this.createdAt.getFullYear().toString() : new Date().getFullYear().toString();
  const idSuffix = this._id ? this._id.toString().slice(-6).toUpperCase() : '000000';
  return `BX-PRP-${dateStr}-${idSuffix}`;
});

proposalSchema.set('toJSON', { virtuals: true });
proposalSchema.set('toObject', { virtuals: true });

export const Proposal: Model<IProposal> =
  mongoose.models.Proposal || mongoose.model<IProposal>('Proposal', proposalSchema);

export default Proposal;
