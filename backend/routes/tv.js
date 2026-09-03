const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/tv', {
      params: {
        api_key: TMDB_API_KEY,
        query: query
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar series' });
  }
});

module.exports = router;