import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Acceso para admin o docente
router.get("/admin", verifyToken(["administrador", "docente"]), (req, res) => {
  res.status(200).json({ message: "Hello Admin or Teacher" });
});

// Solo docentes
router.get("/teacher", verifyToken(["docente"]), (req, res) => {
  res.status(200).json({ message: "Hello Teacher" });
});

// Solo estudiantes
router.get("/student", verifyToken(["estudiante"]), (req, res) => {
  res.status(200).json({ message: "Hello Student" });
});

export default router;
