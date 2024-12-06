import pool from "../models/dbConnection.js";

// Obtener todos los administradores
export const getAdministradores = async (req, res) => {
  try {
    // Consulta con la relación correcta
    const [rows] = await pool.query(`
      SELECT a.id, a.nombres, a.correo, r.nombre_rol AS rol, a.estado, a.fecha_registro
      FROM administradores AS a
      JOIN roles AS r ON a.rol_id = r.id_rol; -- Verifica que 'id_rol' exista en 'roles'
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error en la consulta:", error.message);
    res.status(500).json({ error: "Error al obtener los administradores" });
  }
};

// Insertar un administrador
export const createAdministrador = async (req, res) => {
    const { nombres, correo, rol_id, estado } = req.body;
  
    // Validar que todos los campos requeridos están presentes
    if (!nombres || !correo || !rol_id || !estado) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
  
    try {
      const [result] = await pool.query(
        `
        INSERT INTO administradores (nombres, correo, rol_id, estado, fecha_registro)
        VALUES (?, ?, ?, ?, NOW());
      `,
        [nombres, correo, rol_id, estado]
      );
  
      // Confirmar la inserción
      if (result.affectedRows > 0) {
        res.status(201).json({
          message: "Administrador insertado correctamente",
          id: result.insertId, // Retorna el ID del administrador insertado
        });
      } else {
        res.status(500).json({ error: "No se pudo insertar el administrador" });
      }
    } catch (error) {
      console.error("Error al insertar administrador:", error.message);
      res.status(500).json({ error: "Error al insertar administrador" });
    }
  };
  
  // Actualizar un administrador
  export const updateAdministrador = async (req, res) => {
    const { id } = req.params;
    const { nombres, correo, rol_id, estado } = req.body;
  
    // Validar que todos los campos requeridos están presentes
    if (!nombres || !correo || !rol_id || !estado) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
  
    try {
      const [result] = await pool.query(
        `
        UPDATE administradores
        SET nombres = ?, correo = ?, rol_id = ?, estado = ?
        WHERE id = ?;
      `,
        [nombres, correo, rol_id, estado, id]
      );
  
      // Confirmar la actualización
      if (result.affectedRows > 0) {
        res.json({ message: "Administrador actualizado correctamente" });
      } else {
        res.status(404).json({ error: "Administrador no encontrado" });
      }
    } catch (error) {
      console.error("Error al actualizar administrador:", error.message);
      res.status(500).json({ error: "Error al actualizar administrador" });
    }
  };
  
  // Desactivar (lógica) un administrador
  export const deleteAdministrador = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query(
        `
        UPDATE administradores
        SET estado = 'Inactivo'
        WHERE id = ?;
      `,
        [id]
      );
  
      // Confirmar la desactivación
      if (result.affectedRows > 0) {
        res.json({ message: "Administrador desactivado correctamente" });
      } else {
        res.status(404).json({ error: "Administrador no encontrado" });
      }
    } catch (error) {
      console.error("Error al desactivar administrador:", error.message);
      res.status(500).json({ error: "Error al desactivar administrador" });
    }
  };
  