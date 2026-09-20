const mongoose = require('mongoose');

const talentApplicationSchema = new mongoose.Schema(
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
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
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

const TalentApplication =
  mongoose.models.TalentApplication ||
  mongoose.model('TalentApplication', talentApplicationSchema);

module.exports = TalentApplication;
