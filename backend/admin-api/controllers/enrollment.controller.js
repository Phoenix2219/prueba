import Enrollment from "../models/enrollment.model.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

// Crear matrícula
export const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Validar datos requeridos
    if (!studentId || !courseId) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    // Verificar si ya está matriculado
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "El estudiante ya está matriculado en este curso" });
    }

    // Verificar que el curso exista y esté activo
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    if (course.state !== "activo") {
      return res.status(400).json({ message: "El curso no está activo" });
    }

    // Crear nueva matrícula
    const newEnrollment = new Enrollment({
      studentId,
      courseId,
      state: "matriculado",
    });

    await newEnrollment.save();

    res.status(201).json({
      message: "Matrícula creada con éxito",
      enrollment: newEnrollment,
    });
  } catch (error) {
    console.error("Error al matricular:", error);
    res.status(500).json({ message: "Error al matricular estudiante" });
  }
};

// Obtener matrículas de un estudiante
export const getEnrollmentsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({ message: "Falta el ID del estudiante" });
    }

    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId", "nameCourse dateCourse state")
      .populate("studentId", "username email");

    res.status(200).json(enrollments);
  } catch (error) {
    //console.error("Error al obtener matrículas:", error);
    res.status(500).json({ message: "Error al obtener matrículas" });
  }
};
