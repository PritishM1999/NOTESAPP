const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

// Define middleware function
function setupMiddleware(app) {
  // Parse incoming request bodies in a middleware before your handlers
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  app.use(cookieParser());

  // Enable CORS
  app.use(cors());

  // Set security-related headers
  app.use(helmet());

  // Compress response bodies
  app.use(compression());
}

// Export middleware function directly
module.exports = setupMiddleware;
