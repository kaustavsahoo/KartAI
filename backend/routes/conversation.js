import express from 'express';
const router = express.Router();

import Conversation from "../models/conversation.js";

// Initiate a new conversation
router.post('/start', async (req, res) => {
    try {
        const { messageContent } = req.body;

        const {userID} = req;
        let conversation = new Conversation({ user: userID, messages: [] });

        conversation.messages.push({
            role: 'system',
            content: `You are a fashion outfit generator AI working for Flipkart.

            Here is some information about the user:
            - They are a 60 year old male
            - They prefer decent clothes
                        
            Here are some popular fashion trends that may or may not be relevant:
            - Intense Prints
            - Pastel Tones
            - Maintainable Design
            - Tank Tops
            - Borders
            - Explanation Gems
            - Lehengas
            - Neon Tones
            - Palazzo Pants
            - Strong Shoulders
            - Metallics
            - Sheer Textures
            - Customary Materials
            - Intense Embellishments
            - Unsettles
            - Weaving
            - Off-Shoulder Tops
            
            Please provide a list of potential products available for purchase on Flipkart, enclose every product with square brackets except for the main product/dress which should be enclosed in curly bracket.`
        });

        // await conversation.save();
        // call open ai

        conversation.messages.push({
            role: 'user',
            content: messageContent
        });

        await conversation.save();

        res.status(200).json({ message: 'Conversation initiated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Add data to an existing conversation
router.post('/add', async (req, res) => {
    try {
        const { messageContent, conversationId } = req.body;
        const {userID} = req;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found.' });
        }

        if (conversation.user.toString() !== userID) {
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

export default router;
