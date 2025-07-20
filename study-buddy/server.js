require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate content' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
