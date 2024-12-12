import express from "express";
import {
  obtenerDatosDashboard,
  obtenerRutas,
  obtenerTendenuscripciones,
} from "../controllers/Graficos.controller.js";

const router = express.Router();

// Ruta para obtener datos del dashboard
router.get("/dashboard", obtenerDatosDashboard);

// Ruta para obtener rutas destacadas
router.get("/rutas-populares", obtenerRutas);

// Ruta para obtener tendencias de planes
router.get("/planes", obtenerTendenuscripciones);

export default router;