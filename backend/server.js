require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const certificationRoutes = require('./routes/certifications'); 
const achievementRoutes = require('./routes/achievements');
const leadershipRoutes = require('./routes/leadership');

const app = express();

app.use(cors({
  origin: function(origin, callback) {

    const localhost = ['http://localhost:5173', 'http://localhost:3000'];

    const isVercel = origin && (
      origin.endsWith('.vercel.app') || 
      origin.includes('vercel.app')
    );
    
   
    const allowed = [
      'https://tamayodb-website-frontend.vercel.app', 
      process.env.FRONTEND_URL 
    ].filter(Boolean);
   
    if (!origin || localhost.includes(origin) || isVercel || allowed.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/leadership', leadershipRoutes);


app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'tamayodb-api'
  });
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
   
  });


app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message 
  });
});