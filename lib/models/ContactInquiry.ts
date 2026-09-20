import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  category: 'Partnerships' | 'General' | 'Press' | 'Product Support';
  organization?: string;
  subject: string;
  message: string;
  status: 'received' | 'under_review' | 'responded' | 'archived';
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

const contactInquirySchema = new Schema<IContactInquiry>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
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
    category: {
      type: String,
      trim: true,
      default: 'General',
      enum: ['Partnerships', 'General', 'Press', 'Product Support'],
    },
    organization: {
      type: String,
      trim: true,
      maxlength: [200, 'Organization cannot exceed 200 characters'],
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      minlength: [2, 'Subject must be at least 2 characters'],
      maxlength: [200, 'Subject cannot exceed 200 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [10000, 'Message cannot exceed 10000 characters'],
    },
    status: {
      type: String,
      enum: ['received', 'under_review', 'responded', 'archived'],
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

contactInquirySchema.virtual('referenceCode').get(function () {
  const year = this.createdAt ? this.createdAt.getFullYear().toString() : new Date().getFullYear().toString();
  const suffix = this._id ? this._id.toString().slice(-6).toUpperCase() : '000000';
  return `BX-CNT-${year}-${suffix}`;
});

contactInquirySchema.set('toJSON', { virtuals: true });
contactInquirySchema.set('toObject', { virtuals: true });

export const ContactInquiry: Model<IContactInquiry> =
  mongoose.models.ContactInquiry ||
  mongoose.model<IContactInquiry>('ContactInquiry', contactInquirySchema);

export default ContactInquiry;
