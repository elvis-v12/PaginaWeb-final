import express from "express";
import {
    getRutas,
    createRuta,
    updateRuta,
} from "../controllers/rutas.controller.js";

const router = express.Router();

// Obtener todas las rutas
router.get("/rutas", getRutas);

// Insertar una nueva ruta
router.post("/rutas", createRuta);

// Actualizar una ruta
router.put("/rutas/:id", updateRuta);

export default router;