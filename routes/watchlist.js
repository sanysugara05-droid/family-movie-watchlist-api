
import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeModification } from '../middleware/authorize.js';

import {
  getWatchlist,
  addMovie,
  updateMovie,
  deleteMovie
} from '../utils/db.js';

const router = express.Router();

// Semua endpoint watchlist wajib menggunakan token
router.use(authenticate);

// Melihat watchlist pengguna
router.get('/:userId', (req, res) => {
  const watchlist = getWatchlist(Number(req.params.userId));

  if (watchlist === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(200).json(watchlist);
});

// Menambahkan film
router.post('/:userId/movies', authorizeModification, (req, res) => {
  const movie = addMovie(Number(req.params.userId), req.body);

  if (movie === null) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.status(201).json(movie);
});

// Mengubah data film
router.put('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const movie = updateMovie(
    Number(req.params.userId),
    Number(req.params.movieId),
    req.body
  );

  if (movie === null) {
    return res.status(404).json({ error: 'Movie or user not found' });
  }

  return res.status(200).json(movie);
});

// Menghapus film
router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
  const deleted = deleteMovie(
    Number(req.params.userId),
    Number(req.params.movieId)
  );

  if (!deleted) {
    return res.status(404).json({ error: 'Movie or user not found' });
  }

  return res.status(200).json({ message: 'Movie deleted successfully' });
});

export default router;
