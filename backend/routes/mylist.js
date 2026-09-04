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
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Esta película ya está en tu lista' });
    }
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

// Actualizar una entrada (status, rating, notas)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, myRating, notes } = req.body;

  try {
    const actualizada = await prisma.movieEntry.update({
      where: { id: Number(id) },
      data: { status, myRating, notes }
    });

    res.json(actualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la entrada' });
  }
});

// Borrar una entrada
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.movieEntry.delete({
      where: { id: Number(id) }
    });

    res.json({ mensaje: 'Entrada eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la entrada' });
  }
});

module.exports = router;