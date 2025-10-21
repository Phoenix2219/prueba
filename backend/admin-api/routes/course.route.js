import express from "express"
import { courseActive, newCourse} from "../controllers/course.controller.js"

const router = express.Router()

router.post("/new", newCourse);
//Listar cursos activos
router.get("/active", courseActive);

export default router
