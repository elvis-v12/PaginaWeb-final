// routes/curso.js
import express from 'express';
import CursoController from '../controllers/controllersCursoController.js';

const router = express.Router();

// Ruta para obtener todos los cursos
router.get('/todos', CursoController.obtenerCursos);

export default router;
