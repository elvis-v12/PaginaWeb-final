import pool from "../models/dbConnection.js";

// Obtener datos para el dashboard
export const obtenerDatosDashboard = async (req, res) => {
  try {
    const [[planes]] = await pool.query(`
      SELECT COUNT(*) AS total FROM planes
    `);
    const [[cuentas]] = await pool.query(`
      SELECT COUNT(*) AS total FROM login
    `);
    const [[docentes]] = await pool.query(`
      SELECT COUNT(*) AS total FROM profesores WHERE estado = 'Activo'
    `);
    const [estudiantesTop] = await pool.query(`
      SELECT nombres AS nombre_estudiante, COUNT(*) AS total
      FROM estudiantes
      GROUP BY nombres
      ORDER BY total DESC
      LIMIT 3
    `);

    res.status(200).json({
      planes: planes?.total || 0,
      totalCuentas: cuentas?.total || 0,
      totalDocentes: docentes?.total || 0,
      estudiantesTop,
    });
  } catch (error) {
    console.error("Error al cargar los datos del dashboard:", error);
    res.status(500).json({ error: "Error al cargar los datos del dashboard" });
  }
};

// Obtener datos de rutas destacadas
export const obtenerRutas = async (req, res) => {
  try {
    const [rutas] = await pool.query(`
      SELECT nombre_ruta, COUNT(cursos.id_curso) AS total
      FROM rutas
      LEFT JOIN cursos ON rutas.id_ruta = cursos.id_ruta
      GROUP BY nombre_ruta
      ORDER BY total DESC
    `);

    res.status(200).json(rutas);
  } catch (error) {
    console.error("Error al obtener rutas destacadas:", error);
    res.status(500).json({ error: "Error al obtener rutas destacadas" });
  }
};

// Obtener datos de tendencias de planes
export const obtenerTendenuscripciones = async (req, res) => {
  try {
    const tendencias = {
      basico: [200, 300, 250, 400, 350],
      medio: [300, 250, 400, 300, 450],
      avanzado: [150, 200, 300, 250, 400],
    };

    res.status(200).json(tendencias);
  } catch (error) {
    console.error("Error al cargar tendencias de planes:", error);
    res.status(500).json({ error: "Error al cargar tendencias de planes" });
  }
};
