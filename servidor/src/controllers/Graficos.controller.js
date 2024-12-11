import pool from "../models/dbConnection.js";

// Obtener datos para el dashboard
export const obtenerDatosDashboard = async (req, res) => {
  try {
    const [[suscripciones]] = await pool.query(`
      SELECT COUNT(*) AS total FROM suscripciones
    `);
    const [[cuentas]] = await pool.query(`
      SELECT COUNT(*) AS total FROM cuentas
    `);
    const [[docentes]] = await pool.query(`
      SELECT COUNT(*) AS total FROM profesores WHERE estado = 'Activo'
    `);
    const [rutas] = await pool.query(`
      SELECT nombre_ruta, COUNT(cursos.id_curso) AS total
      FROM rutas
      LEFT JOIN cursos ON rutas.id_ruta = cursos.id_ruta
      GROUP BY nombre_ruta
      ORDER BY total DESC
    `);
    const [categorias] = await pool.query(`
      SELECT nombre_categoria, COUNT(cursos.id_curso) AS total
      FROM categorias
      LEFT JOIN cursos ON categorias.id_categoria = cursos.id_categoria
      GROUP BY nombre_categoria
    `);
    const [cursosPopulares] = await pool.query(`
      SELECT nombre_curso, COUNT(*) AS total
      FROM cursos
      GROUP BY nombre_curso
      ORDER BY total DESC
      LIMIT 10
    `);
    const [estudiantesTop] = await pool.query(`
      SELECT nombre_estudiante, COUNT(curso_id) AS total
      FROM estudiantes
      LEFT JOIN cursos_estudiantes ON estudiantes.id_estudiante = cursos_estudiantes.estudiante_id
      GROUP BY nombre_estudiante
      ORDER BY total DESC
      LIMIT 3
    `);

    res.status(200).json({
      suscripciones: suscripciones?.total || 0,
      totalCuentas: cuentas?.total || 0,
      totalDocentes: docentes?.total || 0,
      rutas,
      categorias,
      cursosPopulares,
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

// Obtener datos de tendencias de suscripciones
export const obtenerTendenuscripciones = async (req, res) => {
  try {
    const tendencias = {
      basico: [200, 300, 250, 400, 350],
      medio: [300, 250, 400, 300, 450],
      avanzado: [150, 200, 300, 250, 400],
    };

    res.status(200).json(tendencias);
  } catch (error) {
    console.error("Error al cargar tendencias de suscripciones:", error);
    res.status(500).json({ error: "Error al cargar tendencias de suscripciones" });
  }
};

// Exportar funciones
export {
  obtenerDatosDashboard,
  obtenerRutas, // Nombre único
  obtenerTendenuscripciones, // Nombre único
};
