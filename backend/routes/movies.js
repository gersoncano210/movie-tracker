const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;

router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: TMDB_API_KEY,
        query: query
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar en TMDB' });
  }
});

module.exports = router;

// Películas populares de la semana
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
      params: { api_key: TMDB_API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener populares' });
  }
});
// Lista de géneros disponibles
router.get('/genres/list', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: { api_key: TMDB_API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener géneros' });
  }
});

// Películas de un género específico
router.get('/genres/:genreId', async (req, res) => {
  const { genreId } = req.params;

  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key: TMDB_API_KEY,
        with_genres: genreId
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener películas del género' });
  }
});

// Detalle de una película específica
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: { api_key: TMDB_API_KEY }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el detalle' });
  }
});
