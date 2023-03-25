const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Get the token from the Authorization header
  const token = req.header('Authorization');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user object to request
    req.user = decoded.user;

    // Call next middleware function
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = auth;

// const jwt = require('jsonwebtoken');
// const User = require('../models/users-schema');

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

//     if (!user) {
//       throw new Error();
//     }

//     req.token = token;
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'User not authorized' });
//   }
// };

// module.exports = { authMiddleware };
