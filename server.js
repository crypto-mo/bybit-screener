const express = require('express');
const axios = require('axios');

const app = express();

const BYBIT_API_KEY = process.env.BYBIT_API_KEY;

app.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get('https://api.bybit.com/v5/market/tickers?category=linear', {
            headers: { 'X-BYBIT-API-KEY': BYBIT_API_KEY }
        });
        res.json(response.data);
    } catch (error) {
        console.error('❌ Failed to fetch Bybit data:', error.message);
        res.status(500).send(`Failed to fetch Bybit data: ${error.message}`);
    }
});

app.get('/', (req, res) => res.send('🚀 Bybit Proxy is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Proxy running on port ${PORT}`);
});
