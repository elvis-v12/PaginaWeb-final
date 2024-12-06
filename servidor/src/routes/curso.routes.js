// routes/curso.js
import express from 'express';
import CursoController from '../controllers/CursoController.js';

const router = express.Router();

// Ruta para agregar un nuevo curso
router.post('/agregar', CursoController.agregarCurso);

export default router;
