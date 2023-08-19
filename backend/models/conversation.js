import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [
        {
            role: { type: String, enum: ['system','user','assistant'], required: true },
            content: { type: String, required: true },
        }
    ]
});

export default mongoose.model('Conversation', conversationSchema, "conversations");