require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');

console.log('MONGO_URI:', process.env.MONGO_URI?.replace(/:[^:]+@/, ':***@')); // Hide password in logs

async function test() {
  try {
    console.log('Connecting...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB!');
    console.log('Database:', mongoose.connection.db.databaseName);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}

test();