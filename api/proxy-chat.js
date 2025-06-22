// proxy-chat.js
import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/', async (req, res) => {
  const { endpoint, payload } = req.body;

  const apiKey = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch(`https://openrouter.ai/api/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://kishorekrazzy.github.io/ckgpt/',  // 👈 Replace with actual URL
        'X-Title': 'Creative AI Suite'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

export default router;
