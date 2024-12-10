// Suponiendo que usas Express
import express from 'express';
import { obtenerDatosEstudiante, actualizarDatosEstudiante } from '../controllers/perfil.controller.js';

const router = express.Router();

// Definir la ruta para obtener el perfil del estudiante
router.get('/perfil/:correo', obtenerDatosEstudiante);

// Ruta para actualizar el perfil de un estudiante
router.put('/perfil/:correo', actualizarDatosEstudiante);

export default router;

