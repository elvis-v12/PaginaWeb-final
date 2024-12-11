import { Router } from 'express';
import { listarCursosCliente } from '../controllers/ClienteCurso.controller.js';

const router = Router();

// Ruta para listar cursos
router.get('/listar', listarCursosCliente);

export default router;
