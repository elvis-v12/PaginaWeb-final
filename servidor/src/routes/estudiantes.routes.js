import express from "express";
import {
  getAllStudents,
  getStudentById,
} from "../controllers/estudiantes.controller.js";

const router = express.Router();

// Ruta para obtener la lista de estudiantes
router.get("/", getAllStudents);

// Ruta para obtener los detalles de un estudiante por ID
router.get("/:id", getStudentById);

export default router;

