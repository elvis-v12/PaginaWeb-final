import pool from "../models/dbConnection.js";

export const getAllStudents = async (req, res) => {
    try {
        console.log("Petición recibida en /api/estudiantes");
        const query = `
            SELECT 
                id_estudiante AS id_estudiante,
                nombres,
                correo,
                fecha_nacimiento,
                direccion,
                telefono,
                biografia,
                genero,
                rango_edad,
                id_categoria_preferencia AS cursos_inscritos,
                fecha_registro,
                estado -- Asegúrate de incluir este campo
            FROM estudiantes;
        `;
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener estudiantes:", error.message);
        res.status(500).json({ error: "Error al obtener estudiantes" });
    }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT 
        id_estudiante AS id_estudiante,
        nombres,
        correo,
        fecha_nacimiento,
        direccion,
        telefono,
        biografia,
        genero,
        rango_edad,
        id_categoria_preferencia AS cursos_inscritos,
        fecha_registro,
        estado
      FROM estudiantes
      WHERE id_estudiante = ?;
    `;
    const [rows] = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Estudiante no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener estudiante:", error.message);
    res.status(500).json({ error: "Error al obtener estudiante" });
  }
};
