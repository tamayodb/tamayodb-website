const mongoose = require('mongoose');

const LeadershipExperienceSchema = new mongoose.Schema({
  organization: { type: String, required: true },
  role: { type: String, required: true },
  dateRange: { type: String, required: true }, 
  responsibilities: { type: [String], required: true },
  url: { type: String, default: '' }, 
  isCurrent: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'leadership_experiences' 
});

module.exports = mongoose.models.LeadershipExperience || 
  mongoose.model('LeadershipExperience', LeadershipExperienceSchema);