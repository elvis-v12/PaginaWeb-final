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

    // Si todo está bien, puedes devolver un token, el usuario, etc.
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso.', usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
