// Import required modules
const express = require('express');
const axios = require('axios');

// Initialize Express app
const app = express();
const PORT = 3000;

// Get the CoinGecko API key from environment variables
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

// Define a route to fetch CoinGecko market data
app.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: {
                ids: 'bitcoin,ethereum,solana,cardano',  // Add other coins as needed
                vs_currencies: 'usd',
                include_market_cap: 'true',
                include_24hr_vol: 'true',
                include_24hr_change: 'true',
                include_last_updated_at: 'true',
            },
            headers: {
                'x-cg-api-key': COINGECKO_API_KEY
            }
        });

        // Respond with the CoinGecko data
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch CoinGecko data:', error.response?.status, error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch CoinGecko data', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ CoinGecko proxy running on port ${PORT}`);
});
