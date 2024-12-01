import express from 'express';
import { registrarUsuario } from '../controllers/registro.controller.js'; // Importar el controlador

const router = express.Router();

router.post('/registro', registrarUsuario);

export default router;
