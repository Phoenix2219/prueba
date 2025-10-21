import express from "express"
import { enrollStudent, getEnrollmentsByStudent } from "../controllers/enrollment.controller.js"

const router = express.Router()

// Crear matrícula
router.post("/new", enrollStudent);
// Obtener matrículas de un estudiante
router.get("/student/:studentId", getEnrollmentsByStudent);

export default router
