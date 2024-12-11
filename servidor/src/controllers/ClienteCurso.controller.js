import pool from "../models/dbConnection.js";

// Función para listar cursos
export const listarCursosCliente = async (req, res) => {
    try {
      console.log("Iniciando consulta de cursos..."); // Log para depurar
      const query = `
        SELECT 
          c.id_curso, 
          c.nombre_curso, 
          c.precio, 
          c.duracion_horas, 
          c.imagen_url, 
          p.nombres AS docente
        FROM cursos c
        LEFT JOIN profesores p ON c.id_profesor = p.id_profesor
        ORDER BY c.imagen_url ASC
      `;
      const [cursos] = await pool.query(query);
  
      console.log("Cursos obtenidos:", cursos); // Log para depurar
      res.status(200).json(cursos);
    } catch (error) {
      console.error('Error al listar cursos para el cliente:', error); // Log del error
      res.status(500).json({ error: 'Error al listar cursos para el cliente' });
    }
  };
  