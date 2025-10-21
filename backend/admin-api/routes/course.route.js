import express from "express"
import { courseActive, newCourse, updateCourse, deleteCourse, getAllCourses} from "../controllers/course.controller.js"

const router = express.Router()

router.post("/new", newCourse);

router.get("/all", getAllCourses);

//Listar cursos activos
router.get("/active", courseActive);

// Actualizar curso
router.put("/update/:id", updateCourse);

// Eliminar curso
router.delete("/delete/:id", deleteCourse);

export default router
