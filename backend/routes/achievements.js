const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/mongodb.js');
const Achievement = require('../models/Achievement.js');
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    await dbConnect();
    
    const dbName = mongoose.connection.db.databaseName;
    console.log('[Achievements] Connected to database:', dbName);
    
    const collections = await mongoose.connection.db.collections();
    console.log('[Achievements] Collections:', collections.map(c => c.collectionName));
    
    const achievements = await Achievement.find({}).sort({ order: 1 }).lean();
    console.log('[Achievements] Found:', achievements.length, 'achievements');

    res.json({ 
      success: true, 
      achievements: achievements 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;