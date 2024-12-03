import db from '../models/dbConnection.js';
import bcrypt from 'bcrypt';

export const iniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
  }

  try {
    // Verificar si el usuario existe
    const [rows] = await db.execute(
      `SELECT * FROM login WHERE correo = ?`,
      [correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const usuario = rows[0];

    // Comparar la contraseña ingresada con la almacenada
    const esValida = await bcrypt.compare(contrasena, usuario.contraseña);

    if (!esValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    // Obtener los datos del estudiante
    const [estudiante] = await db.execute(
      `SELECT nombres, rango_edad FROM estudiantes WHERE correo = ?`,
      [correo]
    );

    if (!estudiante || estudiante.length === 0) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado.' });
    }

    // Obtener el primer nombre
    const primerNombre = estudiante[0].nombres.split(' ')[0];
    const rango_edad = estudiante[0].rango_edad;

    // Enviar solo los datos necesarios en la respuesta
    res.status(200).json({
      exito: true,
      mensaje: 'Inicio de sesión exitoso.',
      correo: correo,
      nombre: primerNombre,
      rango_edad: rango_edad // Enviar el rango de edad
    });

    console.log('Datos enviados al cliente:', {
      nombre: primerNombre,
      correo,
      rango_edad
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
