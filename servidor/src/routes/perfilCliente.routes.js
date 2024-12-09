import express from 'express';
import { obtenerPerfil, actualizarPerfil } from '../controllers/perfilCliente.controller.js';

const router = express.Router();

// Ruta para obtener el perfil de un usuario por correo
router.get('/perfil/:correo', obtenerPerfil);

// Ruta para actualizar el perfil de un usuario
router.put('/perfil/actualizar', actualizarPerfil);

export default router;
