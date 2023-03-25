const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConfig = require('./config/db');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const middleware = require('./config/middleware');

mongoose.connect(dbConfig.url, dbConfig.options)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`MongoDB Error: ${err}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(middleware.jwtMiddleware);

app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});



// const express = require('express');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
// const noteRoutes = require('./routes/noteRoutes');
// const {authMiddleware} = require('./middleware/authMiddleware');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/notes-app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Routes
// app.use('/auth', authRoutes);
// app.use(authMiddleware.checkToken); // Middleware to check JWT token
// app.use('/notes', noteRoutes);

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
