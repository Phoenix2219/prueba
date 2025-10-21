import express from "express";
import Course from "../models/course.model.js";

export const newCourse = async (req, res) => {
    try {
    const { teacherId, nameCourse, state } = req.body;

    // Validar campos requeridos
    if (!teacherId || !nameCourse) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    // Crear un nuevo curso
    const newCourse = new Course({
      teacherId,
      nameCourse,
      state: state || "activo",
    });

    // Guardar en la base de datos
    await newCourse.save();

    return res.status(201).json({
      message: "Curso creado exitosamente",
      course: newCourse,
    });
  } catch (error) {
    console.error("Error al crear curso:", error);
    return res.status(500).json({
      message: "Error interno del servidor al crear curso",
    });
  }
}

// Obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teacherId", "username")
      .sort({ dateCourse: -1 });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({ message: "Error al obtener cursos" });
  }
};

// Obtener todos los cursos activos
export const courseActive = async (req, res) => {
    try {
    const courses = await Course.find({ state: "activo" })
      .populate("teacherId", "username email")
      .sort({ dateCourse: -1 });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error al obtener cursos activos:", error);
    res.status(500).json({ message: "Error al obtener cursos activos" });
  }
}

// Actualizar curso (activar, cambiar docente, nombre, estado, etc.)
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacherId, nameCourse, state } = req.body;

    const updated = await Course.findByIdAndUpdate(
      id,
      { teacherId, nameCourse, state },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    res.status(200).json({
      message: "Curso actualizado correctamente",
      course: updated,
    });
  } catch (error) {
    console.error("Error al actualizar curso:", error);
    res.status(500).json({ message: "Error al actualizar curso" });
  }
};

// Cambiar estado a inactivo (soft delete)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      { state: "inactivo" },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }

    res.status(200).json({
      message: "Curso marcado como inactivo correctamente",
      course,
    });
  } catch (error) {
    console.error("Error al inactivar curso:", error);
    res.status(500).json({ message: "Error al cambiar estado del curso" });
  }
};