const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware');
const Conversation = require('../models/conversation');
const User = require('../models/user');

// Initiate a new conversation
router.post('/start-conversation', authMiddleware, async (req, res) => {
    try {
        const { userId, messageContent } = req.body;
        // const userId = req.user.id;

        let conversation = await Conversation.findOne({ user: userId }).exec();
        if (!conversation) {
            conversation = new Conversation({ user: userId, messages: [] });
        }

        conversation.messages.push({
            sender: 'user',
            content: messageContent
        });

        await conversation.save();

        const user = await User.findById(userId);
        user.conversations.push(conversation._id);
        await user.save();

        res.status(200).json({ message: 'Conversation initiated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while starting the conversation.' });
    }
});

// Add data to an existing conversation
router.post('/add-to-conversation/:conversationId', authMiddleware, async (req, res) => {
    try {
        const { messageContent, userId } = req.body;
        // const userId = req.user.id;
        const conversationId = req.params.conversationId;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found.' });
        }

        if (conversation.user.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to add to this conversation.' });
        }

        conversation.messages.push({
            sender: 'user',
            content: messageContent
        });

        await conversation.save();

        res.status(200).json({ message: 'Message added to the conversation.' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding to the conversation.' });
    }
});

module.exports = router;
