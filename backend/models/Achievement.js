const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  award: { type: String, required: true },
  awardType: { type: String, enum: ['winner', 'special', 'participation'], default: 'participation' },
  description: { type: [String], required: true },
  url: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
  collection: 'achievements' 
});

module.exports = mongoose.models.Achievement || 
  mongoose.model('Achievement', AchievementSchema);