const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/mongodb.js');
const Certification = require('../models/Certification.js');
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
  try {
    await dbConnect();
    
    // 🔍 RAW QUERY - bypasses Mongoose model entirely
    const rawCertifications = await mongoose.connection.db
      .collection('certifications')  // Try without "portfolio." first
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    console.log('\n🔍 RAW QUERY RESULTS:');
    console.log('📁 Collection: certifications');
    console.log('✅ Found:', rawCertifications.length, 'documents');
    if (rawCertifications.length > 0) {
      console.log('📄 Sample:', JSON.stringify(rawCertifications[0], null, 2).substring(0, 200) + '...\n');
    }
    
    // Also try the other collection name
    const rawCertifications2 = await mongoose.connection.db
      .collection('portfolio.certifications')
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    console.log('📁 Collection: portfolio.certifications');
    console.log('✅ Found:', rawCertifications2.length, 'documents\n');

    // Return whichever has data
    const certifications = rawCertifications.length > 0 ? rawCertifications : rawCertifications2;

    res.json({ 
      success: true, 
       certifications  // ← Must be "data" for frontend
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
module.exports = router;