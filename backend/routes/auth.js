const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Define a register endpoint under /auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, name, password } = req.body;

        const user = new User({ username, password, name });
        await user.save();

        const token = user.generateToken();

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Define a login endpoint under /auth/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const match = await user.comparePassword(password);

        if (!match) {
            return res.status(401).json({ message: 'Wrong password' });
        }
        const token = user.generateToken();

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
