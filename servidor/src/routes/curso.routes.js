import multer from "multer";
import express from "express";
import CursoController from "../controllers/Curso.Controller.js";

const router = express.Router();

// Configuración básica de multer
const upload = multer({
    dest: "uploads/", // Carpeta donde se guardarán las imágenes
});

// Rutas
router.get("/rutas", CursoController.obtenerRutas);
router.get("/categorias", CursoController.obtenerCategorias);
router.get("/listar", CursoController.listarCursos);
router.post("/sesiones/agregar", CursoController.agregarSesion);
router.get("/profesores", CursoController.obtenerProfesores);
router.put("/actualizar", CursoController.actualizarCurso);
router.put("/descripcion", CursoController.actualizarDescripcion);
router.post("/videos/agregar", CursoController.agregarVideo);
router.get("/nombres-cursos", CursoController.obtenerNombresCursos);

// Ruta para agregar curso con multer
router.post("/agregar", upload.single("imagen"), CursoController.agregarCurso);

export default router;
