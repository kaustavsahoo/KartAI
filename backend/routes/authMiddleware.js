import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Get the secret key from the config file
import {secret} from '../config.js';

// Define a middleware function to verify the token and attach the user to the request
const auth = async (req, res, next) => {
  try {
    // Get the token from the header
    const token = req.headers['authorization'].split(' ')[1];
    // Verify the token and get the payload
    const payload = jwt.verify(token, secret);
    // Attach the userid to the request
    req.userID = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;