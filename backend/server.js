require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const Question = require('./models/Question');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// 🔍 Google Search API
app.post('/api/search', async (req, res) => {
    try {
        const { question } = req.body;
        if (!question)
        return res.status(400).json({ error: 'Question required' });

        const params = {
        key: process.env.GOOGLE_API_KEY,
        cx: process.env.GOOGLE_CX,
        q: question,
        num: 3
        };

    const googleRes = await axios.get('https://www.googleapis.com/customsearch/v1', { params });
    const items = googleRes.data.items || [];

    let answer = 'No good answer found.';
    let source = '';
    if (items.length > 0) {
        const top = items[0];
        answer = top.snippet || top.title || 'No snippet available';
        source = top.link || top.formattedUrl || '';
    }

    const doc = new Question({ question, answer, source });
    await doc.save();

    res.json({ question, answer, source });
} catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ error: 'Search failed', details: err.message });
}
});

// 🕓 Fetch History
app.get('/api/history', async (req, res) => {
try {
    const rows = await Question.find().sort({ createdAt: -1 }).limit(10);
    res.json(rows);
} catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
}
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
