import db from '../models/dbConnection.js';
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res) => {
  const { nombres, correo, fecha_nacimiento, contrasena } = req.body;

  if (!nombres || !correo || !fecha_nacimiento || !contrasena) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
  }

  const fecha_registro = new Date();

  try {
    // Encriptar la contraseña
    const saltRounds = 10; // Número de rondas de sal para bcrypt
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Insertar en la tabla estudiantes
    const [result] = await db.execute(
      `INSERT INTO estudiantes (nombres, fecha_nacimiento, correo, fecha_registro) VALUES (?, ?, ?, ?)`,
      [nombres, fecha_nacimiento, correo, fecha_registro]
    );

    const idEstudiante = result.insertId;

    // Insertar en la tabla login con la contraseña encriptada
    await db.execute(
      `INSERT INTO login (correo, contraseña, id_estudiante) VALUES (?, ?, ?)`,
      [correo, hashedPassword, idEstudiante]
    );

    res.status(201).json({ mensaje: 'Registro exitoso.' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
