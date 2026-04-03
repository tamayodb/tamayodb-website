const mongoose = require('mongoose');

let cachedConnection = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedConnection = conn;
    console.log('MongoDB Connected:', conn.connection.host);
    return conn;
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    throw error;
  }
}

module.exports = dbConnect;