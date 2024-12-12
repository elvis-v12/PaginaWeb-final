import express from 'express';
import {
    getCertificados,
    queryCertificados,
} from '../controllers/certificados.controller.js';

const router = express.Router();

// Obtener todos los certificados
router.get('/certificados', getCertificados);

// Buscar un certificado por ID
router.get('/certificados/:id_certificado', queryCertificados);

export default router;