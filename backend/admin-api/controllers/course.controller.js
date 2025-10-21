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