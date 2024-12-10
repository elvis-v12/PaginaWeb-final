import express from 'express';
import CursoController from '../controllers/Curso.Controller.js';

const router = express.Router();

// Ruta para obtener rutas
router.get('/rutas', CursoController.obtenerRutas);

// Ruta para obtener categorías
router.get('/categorias', CursoController.obtenerCategorias);

// Ruta para agregar un curso
router.post('/agregar', CursoController.agregarCurso);

// Ruta para obtener todos los cursos
router.get('/listar', CursoController.listarCursos);

// Ruta para agregar sesiones a un curso
router.post('/sesiones/agregar', CursoController.agregarSesion);

router.get('/profesores', CursoController.obtenerProfesores); // Nueva ruta para profesores

// Ruta para actualizar curso
router.put('/actualizar', CursoController.actualizarCurso);

// Ruta para actualizar descripción
router.put('/descripcion', CursoController.actualizarDescripcion);

// Ruta para agregar video
router.post("/videos/agregar", CursoController.agregarVideo);

// Ruta para obtener nombres de los cursos
router.get('/nombres-cursos', CursoController.obtenerNombresCursos);


export default router;
