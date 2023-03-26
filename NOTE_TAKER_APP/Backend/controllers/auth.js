const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const register = async (req, res) => {
  const { email, password } = req.body;

  // check if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: 'User already exists' });
  }

  // create new user
  const newUser = new User({ email, password });
  // hash password before saving to database
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  try {
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }

  // check if password is correct
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // create and sign JWT token
  const payload = { userId: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.status(200).json({email, password , token, message: 'Login Sucessfull' });
};

module.exports = { register, login };
