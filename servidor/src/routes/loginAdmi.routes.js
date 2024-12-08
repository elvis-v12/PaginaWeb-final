import express from 'express';
import { loginUser, changePassword } from '../controllers/loginAdmin.controller.js';

const router = express.Router();

// Ruta para manejar el inicio de sesión
router.post('/login', loginUser);

// Ruta para cambiar contraseña
router.post('/change-password', changePassword);

export default router;
