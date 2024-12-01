import express from 'express';
import { iniciarSesion } from '../controllers/login.controller.js';

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

export default router;
