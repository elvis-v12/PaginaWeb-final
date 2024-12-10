import pool from "../models/dbConnection.js";

// Obtener todas las rutas
export const getRutas = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT id_ruta, nombre_ruta, descripcion FROM rutas;`
        );
        res.json(rows);
    } catch (error) {
        console.error("Error en la consulta:", error.message);
        res.status(500).json({ error: "Error al obtener las rutas" });
    }
};

// Insertar una nueva ruta
export const createRuta = async (req, res) => {
    const { nombre_ruta, descripcion } = req.body;

    if (!nombre_ruta || !descripcion) {
        return res.status(400).json({ error: "El campo 'nombre_ruta' es obligatorio" });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO rutas (nombre_ruta, descripcion) VALUES (?, ?);`,
            [nombre_ruta, descripcion]
        );

        if (result.affectedRows > 0) {
            res.status(201).json({
                message: "Ruta insertada correctamente",
                id: result.insertId,
            });
        } else {
            res.status(500).json({ error: "No se pudo insertar la ruta" });
        }
    } catch (error) {
        console.error("Error al insertar ruta:", error.message);
        res.status(500).json({ error: "Error al insertar ruta" });
    }
};

// Actualizar una ruta
export const updateRuta = async (req, res) => {
    const { id_ruta } = req.params;
    const { nombre_ruta, descripcion } = req.body;

    if (!nombre_ruta || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const [result] = await pool.query(
            `UPDATE rutas SET nombre_ruta = ?, descripcion = ? WHERE id_ruta = ?;`,
            [nombre_ruta, descripcion, id_ruta]
        );

        if (result.affectedRows > 0) {
            res.json({ message: "Ruta actualizada correctamente" });
        } else {
            res.status(404).json({ error: "Ruta no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar ruta:", error.message);
        res.status(500).json({ error: "Error al actualizar ruta" });
    }
};