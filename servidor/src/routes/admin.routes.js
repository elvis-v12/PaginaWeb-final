import express from 'express';
import {
  getAdministradores,
  createAdministrador,
  updateAdministrador,
  deleteAdministrador,
} from '../controllers/admin.controller.js';

const router = express.Router();

// Obtener todos los administradores
router.get('/administradores', getAdministradores);

// Insertar un administrador
router.post('/administradores', createAdministrador);

// Actualizar un administrador
router.put('/administradores/:id', updateAdministrador);

// Desactivar (eliminar lógicamente) un administrador
router.delete('/administradores/:id', deleteAdministrador);

export default router;
