import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [
        {
            role: { type: String, enum: ['system','user','bot'], required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        }
    ]
});

export default mongoose.model('Conversation', conversationSchema, "conversations");