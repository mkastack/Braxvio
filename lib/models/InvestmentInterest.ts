import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInvestmentInterest extends Document {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  status: 'received' | 'under_review' | 'contacted' | 'accepted' | 'declined';
  phone?: string;
  organization?: string;
  jobTitle?: string;
  country?: string;
  website?: string;
  investorType?: string;
  interestType?: string;
  productId?: string;
  indicativeRange?: string;
  timeline?: string;
  consentAgreed?: boolean;
  documents?: unknown[];
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

const investmentInterestSchema = new Schema<IInvestmentInterest>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [1, 'First name must be at least 1 character'],
      maxlength: [80, 'First name cannot exceed 80 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [1, 'Last name must be at least 1 character'],
      maxlength: [80, 'Last name cannot exceed 80 characters'],
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
      required: [true, 'Introductory message / strategic thesis is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [10000, 'Message cannot exceed 10000 characters'],
    },
    status: {
      type: String,
      enum: ['received', 'under_review', 'contacted', 'accepted', 'declined'],
      default: 'received',
      index: true,
    },
    phone: { type: String, trim: true },
    organization: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    country: { type: String, trim: true },
    website: { type: String, trim: true },
    investorType: { type: String, trim: true, default: 'Individual Investor' },
    interestType: { type: String, trim: true, default: 'Braxvio Parent Company' },
    productId: { type: String, trim: true },
    indicativeRange: { type: String, trim: true, default: 'Prefer not to disclose' },
    timeline: { type: String, trim: true, default: 'Exploring' },
    consentAgreed: { type: Boolean, default: true },
    documents: { type: Array, default: [] },
    emailNotificationStatus: {
      internalSent: { type: Boolean, default: false },
      confirmationSent: { type: Boolean, default: false },
      lastError: { type: String, default: null },
      processedAt: { type: Date, default: null },
    },
  },
  { timestamps: true }
);

investmentInterestSchema.virtual('referenceCode').get(function () {
  const year = this.createdAt ? this.createdAt.getFullYear().toString() : new Date().getFullYear().toString();
  const suffix = this._id ? this._id.toString().slice(-6).toUpperCase() : '000000';
  return `BX-INV-${year}-${suffix}`;
});

investmentInterestSchema.set('toJSON', { virtuals: true });
investmentInterestSchema.set('toObject', { virtuals: true });

export const InvestmentInterest: Model<IInvestmentInterest> =
  mongoose.models.InvestmentInterest ||
  mongoose.model<IInvestmentInterest>('InvestmentInterest', investmentInterestSchema);

export default InvestmentInterest;
