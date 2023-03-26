const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/db');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const setupMiddleware = require('./config/middleware');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, dbConfig.options)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`MongoDB Error: ${err}`));

// Set up middleware
setupMiddleware(app);

// Set up routes
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
