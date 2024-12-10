import express from "express";
import {
  getProfesores,
  createProfesor,
  updateProfesor,
  getProfesorById,
  getCoursesByCategory,
} from "../controllers/DatosAdmin.controller.js";

const router = express.Router();

// Ruta para obtener todos los profesores (GET)
router.get("/", getProfesores);

// Ruta para obtener un profesor por ID (GET)
router.get("/:id", getProfesorById);

// Ruta para crear un profesor (POST)
router.post("/", createProfesor);

// Ruta para actualizar un profesor (PUT)
router.put("/:id", updateProfesor);

// Ruta para obtener cursos organizados por categoría
router.get("/courses/categories", getCoursesByCategory);

export default router;
