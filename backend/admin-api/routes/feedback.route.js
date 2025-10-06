import express from "express"
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { createFeedback, feedbackDocument, listStudents, getStudentDocuments} from "../controllers/feedback.controller.js"

const router = express.Router()

//Listar estudiantes
router.get("/students", verifyToken(["administrador", "docente"]), listStudents);
//Extraer documentos de un estudiante específico
router.get("/student/:id/documents", verifyToken(["administrador", "docente"]), getStudentDocuments);
//Crear retroalimentación
router.post("/create", verifyToken(["docente"]), createFeedback)
//Obtener retroalimentación por documento
router.get("/student/:id/feeback", feedbackDocument)


export default router
