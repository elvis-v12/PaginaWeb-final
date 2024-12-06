// controllers/CursoController.js
import pool from "../models/dbConnection.js"; // Importamos el pool de conexión a la base de datos

const obtenerCursos = async (req, res) => {
    const query = 'SELECT * FROM cursos';

    try {
        const [results] = await pool.execute(query); // Usamos pool.execute() para la consulta
        res.status(200).json(results); // Respondemos con los resultados
    } catch (err) {
        console.error('Error al obtener los cursos:', err);
        res.status(500).json({ message: 'Error al obtener los cursos', error: err });
    }
};

export default { obtenerCursos };
