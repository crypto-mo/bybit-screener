// Import dependencies
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Retrieve API key from environment variables
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

// Fetch Bybit-traded coin prices from CoinGecko
app.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get('https://pro-api.coingecko.com/api/v3/exchanges/bybit/tickers', {
            headers: {
                'x-cg-pro-api-key': COINGECKO_API_KEY
            }
        });

        const tickers = response.data.tickers;

        // Filter relevant data
        const coinData = tickers.map(ticker => ({
            base: ticker.base,
            target: ticker.target,
            price: ticker.last,
            volume: ticker.volume
        }));

        console.log('📊 CoinGecko API Response:', coinData);
        res.json(coinData);
    } catch (error) {
        console.error('❌ Failed to fetch CoinGecko data:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// Health check
app.get('/', (req, res) => {
    res.send('🚀 CoinGecko Proxy is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
