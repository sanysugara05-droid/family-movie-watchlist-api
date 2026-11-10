
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByUsername } from '../utils/db.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be configured in the environment.");
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body || {};

  // Periksa kelengkapan data
  if (!username || !password) {
    return res.status(400).json({
      error: 'Username and password are required.'
    });
  }

  // Cari pengguna berdasarkan username
  const user = findByUsername(username);

  if (!user) {
    return res.status(401).json({
      error: 'Invalid username or password.'
    });
  }

  // Periksa password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return res.status(401).json({
      error: 'Invalid username or password.'
    });
  }

  // Buat JWT token
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.status(200).json({ token });
});

export default router;
