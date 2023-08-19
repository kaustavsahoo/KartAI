import express from 'express';
import authMiddleware from './authMiddleware.js';
import user from './user.js';
import auth from './auth.js';
import flipkart from './flipkart/flipkart.js';
import conversation from "./chat/conversation.js";

const router = express.Router();

// Use user module for handling /auth/register and /auth/login requests
router.use('/auth', auth);

router.use('/conversation', authMiddleware, conversation);

// Use user module for handling /flipkart requests
router.use('/flipkart', flipkart);

// Use auth middleware for handling /user request
router.use('/user', authMiddleware, user);

export default router;