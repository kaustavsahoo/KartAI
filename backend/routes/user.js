const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Define a get user endpoint under /user that requires authentication
router.get('/info', async (req, res) => {
    try {
        const { userID } = req;

        const user = await User.findById(userID);

        res.status(200).json({ username: user.username, name: user.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create an endpoint to update the user's name
router.put('/', async (req, res) => {
    try {
        const { userID } = req;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const user = await User.findById(userID);
        user.name = name;
        await user.save();

        res.status(200).json({ username: user.username, name: user.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;