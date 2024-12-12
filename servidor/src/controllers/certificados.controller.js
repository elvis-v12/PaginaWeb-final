import pool from "../models/dbConnection.js";

export const getCertificados = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT e.nombres AS estudiantes, c.nombre_curso AS cursos, x.titulo_examen AS examenes,
                ce.fecha_emision, ce.url_certificado, ce.estado
            FROM certificados AS ce
            JOIN estudiantes AS e ON e.id_estudiante = ce.id_estudiante  -- Relación entre 'estudiantes' y 'certificados'
            JOIN cursos AS c ON c.id_curso = ce.id_curso  -- Relación entre 'cursos' y 'certificados'
            JOIN examenes AS x ON x.id_examen = ce.id_examen;  -- Relación entre 'examenes' y 'certificados'
        `);
        res.json(rows);
    } catch (error) {
        console.error("Error en la consulta: ", error.message);
        res.status(500).json({ error: "Error al obtener los certificados" });
    }
};

export const queryCertificados = async (req, res) => {
    const { id_certificado } = req.params;

    if (!id_certificado) {
        return res.status(400).json({ error: "El ID del certificado es obligatorio" });
    }

    try {
        const [rows] = await pool.query(
            `SELECT e.nombres AS estudiantes, c.nombre_curso AS cursos, x.titulo_examen AS examenes,
                    ce.fecha_emision, ce.url_certificado, ce.estado
            FROM certificados AS ce
            JOIN estudiantes AS e ON e.id_estudiante = ce.id_estudiante
            JOIN cursos AS c ON c.id_curso = ce.id_curso
            JOIN examenes AS x ON x.id_examen = ce.id_examen
            WHERE ce.id_certificado = ?;`,
            [id_certificado]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Certificado no encontrado" });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error("Error en la consulta del certificado: ", error.message);
        res.status(500).json({ error: "Error al buscar el certificado" });
    }
};