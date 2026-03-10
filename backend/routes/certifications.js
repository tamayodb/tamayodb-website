// backend/routes/certifications.js
const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/mongodb.js');
const Certification = require('../models/Certification.js');

router.get('/', async (req, res) => {
  try {
    await dbConnect();
    
    const certifications = await Certification.find({})
      .sort({ date: -1, order: 1 })
      .lean();

    res.json({
      success: true,
      data: certifications, 
    });
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch certifications',
    });
  }
});

module.exports = router;