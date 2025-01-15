const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Set the strictQuery option to true (or false if preferred)
mongoose.set('strictQuery', true);

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('Error: MONGO_URI is not defined in the environment variables');
    process.exit(1); // Exit process with failure
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
