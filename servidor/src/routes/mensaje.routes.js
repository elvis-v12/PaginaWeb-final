import express from 'express';
import { guardarMensaje, listarMensajes, MensajesBandeja, MensajesAbiertos, cerrarMensaje, guardarRespuesta, obtenerRespuestas, obtenerHistorial } from '../controllers/mensaje.controller.js';

const router = express.Router();

// Ruta para guardar un nuevo mensaje
router.post('/guardar', guardarMensaje);

// Ruta para listar los mensajes
router.get('/mensajes', listarMensajes);

// Ruta para listar bandeja
router.get('/bandeja', MensajesBandeja);

// Ruta para listar activos
router.get('/activos', MensajesAbiertos);

// Ruta para cerrar un mensaje
router.patch('/cerrar/:id', cerrarMensaje);

// Ruta para guardar una respuesta asociada a un mensaje
router.post('/respuestas/:idMensaje', guardarRespuesta);

// Ruta para obtener las respuestas asociadas a un mensaje
router.get('/listares/:idMensaje', obtenerRespuestas);

// Ruta para obtener el historial de mensajes y respuestas por correo
router.get('/historial', obtenerHistorial);


export default router;