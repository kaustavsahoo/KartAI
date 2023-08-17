const express = require('express');
const authMiddleware = require('./authMiddleware');
const user = require('./user');
const auth = require('./auth');

const router = express.Router();

// Use user module for handling /auth/register and /auth/login requests
router.use('/auth', auth);

// Use auth middleware for handling /user request
router.use('/user', authMiddleware, user);

module.exports = router;