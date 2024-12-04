import express from 'express';
import { loginUser } from '../controllers/loginAdmin.controller.js';

const router = express.Router();

// Ruta para manejar el inicio de sesión
router.post('/login', loginUser);

export default router;
