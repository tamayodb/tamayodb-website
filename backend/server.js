require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const certificationRoutes = require('./routes/certifications'); 
const achievementRoutes = require('./routes/achievements');
const leadershipRoutes = require('./routes/leadership');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running!' });
});

app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/leadership', leadershipRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); 
  });