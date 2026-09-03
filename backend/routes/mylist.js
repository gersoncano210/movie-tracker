const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Agregar una película a mi lista
router.post('/', async (req, res) => {
  const { tmdbId, mediaType, title, posterPath, userId } = req.body;

  try {
    const nuevaEntrada = await prisma.movieEntry.create({
      data: {
        tmdbId,
        mediaType,
        title,
        posterPath,
        userId
      }
    });

    res.status(201).json(nuevaEntrada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la película' });
  }
});

// Ver todas las entradas de un usuario
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const entradas = await prisma.movieEntry.findMany({
      where: { userId: Number(userId) }
    });

    res.json(entradas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la lista' });
  }
});

module.exports = router;