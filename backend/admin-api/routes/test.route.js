
import express from 'express';
import { verifyToken } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/admin', verifyToken(['admin', 'teacher']), (req, res) => {
  res.status(200).json({ message: 'Hello Admin or Teacher' });
});

router.get('/teacher', verifyToken(['teacher']), (req, res) => {
  res.status(200).json({ message: 'Hello Teacher' });
});

router.get('/student', verifyToken(['student']), (req, res) => {
  res.status(200).json({ message: 'Hello Student' });
});

export default router;
