const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    tags:        [{ type: String }],
    liveUrl:     { type: String, default: '' },
    githubUrl:   { type: String, default: '' },
    featured:    { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true } // auto-adds createdAt and updatedAt
);

module.exports = mongoose.model('Project', ProjectSchema);