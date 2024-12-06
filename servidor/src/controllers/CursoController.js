// controllers/CursoController.js
import pool from "../models/dbConnection.js"; // Importamos la conexión a la base de datos

const agregarCurso = async (req, res) => {
    const { id_ruta, id_profesor, nombre_curso, descripcion, nivel_edad, es_pago, precio, duracion_horas } = req.body;
    
    // Validar que los campos requeridos estén presentes
    if (!id_ruta || !id_profesor || !nombre_curso || !duracion_horas) {
        return res.status(400).json({ message: 'Campos requeridos faltantes' });
    }

    // Insertar el nuevo curso en la base de datos
    const query = `
        INSERT INTO cursos (id_ruta, id_profesor, nombre_curso, descripcion, nivel_edad, es_pago, precio, duracion_horas)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
        const [result] = await pool.execute(query, [id_ruta, id_profesor, nombre_curso, descripcion, nivel_edad, es_pago, precio, duracion_horas]);
        res.status(201).json({ message: 'Curso agregado correctamente', result });
    } catch (err) {
        console.error('Error al guardar el curso:', err);
        res.status(500).json({ message: 'Error al guardar el curso', error: err });
    }
};

export default { agregarCurso };
