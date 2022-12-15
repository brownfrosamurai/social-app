import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from './user.model.js';

/**
 * REGISTER USER
 */

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000)
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * LOGGING IN
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // VALIDATE EMAIL 
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    // VALIDATE PASSWORD 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials. ' });

    // CREATE TOKEN 
    const token = jwt.sign({ id: user._id, email: email }, process.env.JWT_SECRET);

    // REMOVE PASSWORD FROM PAYLOAD 
    user.password = undefined;

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}