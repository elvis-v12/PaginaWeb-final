import express from 'express';
import { obtenerCategorias, guardarPostulacion, listarPostulaciones, editarBeca} from '../controllers/becas.controller.js';

const router = express.Router();

// Ruta para obtener categorías
router.get('/categorias', obtenerCategorias);

// Nueva ruta para guardar postulaciones
router.post('/postular', guardarPostulacion);

router.get('/listar', listarPostulaciones);

router.put('/editar', editarBeca);

export default router;
