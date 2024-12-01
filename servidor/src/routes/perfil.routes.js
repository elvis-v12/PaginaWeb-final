import express from 'express';
import { obtenerPerfil } from '../controllers/perfil.controller.js';

const router = express.Router();

router.get('/api/perfil/:correo', obtenerPerfil);

export default router;