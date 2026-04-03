const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/mongodb.js');
const Leadership = require('../models/Leadership.js');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    await dbConnect();
    
    const dbName = mongoose.connection.db.databaseName;
    console.log('[Leadership] Connected to database:', dbName);
    
    const collections = await mongoose.connection.db.collections();
    console.log('[Leadership] Collections:', collections.map(c => c.collectionName));
    
    const experiences = await Leadership.find({}).sort({ order: 1 }).lean();
    console.log('[Leadership] Found:', experiences.length, 'experiences');

    res.json({ 
      success: true, 
      experiences: experiences 
    });
  } catch (error) {
    console.error('[Leadership] Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;