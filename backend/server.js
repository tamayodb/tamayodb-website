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
   
    const allowed = [
      'http://localhost:5173',           // Vite dev
      'http://localhost:3000',           // CRA dev
      'https://tamayodb-website-frontend-o71fhu0o7.vercel.app', // Vercel frontend
      process.env.FRONTEND_URL           
    ].filter(Boolean); 
    
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('CORS blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());


app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/leadership', leadershipRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); 
  });