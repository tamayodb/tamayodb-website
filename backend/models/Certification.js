const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  provider: { type: String, required: true },
  url: { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.models.Certification || 
  mongoose.model('Certification', CertificationSchema);