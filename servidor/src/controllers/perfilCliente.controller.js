import db from '../models/dbConnection.js';

export const obtenerPerfil = async (req, res) => {
  const { correo } = req.params; // Obtener el correo desde los parámetros de la URL

  if (!correo) {
    return res.status(400).json({ mensaje: 'El correo es obligatorio.' });
  }

  try {
    const [result] = await db.execute(
      `SELECT nombres, apellidos, direccion, correo, telefono, biografia, genero, fecha_nacimiento
         FROM estudiantes
         WHERE correo = ?`,
      [correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const usuario = result[0]; // El primer resultado de la consulta

    // Asegúrate de que la fecha esté en el formato adecuado para ser enviada
    const fecha_nacimiento = usuario.fecha_nacimiento; // Este valor debería ser en formato YYYY-MM-DD

    return res.status(200).json({
      exito: true,
      mensaje: 'Perfil encontrado.',
      datos: {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        direccion: usuario.direccion,
        correo: usuario.correo,
        telefono: usuario.telefono,
        biografia: usuario.biografia,
        genero: usuario.genero,
        fecha_nacimiento, // Debería estar en formato correcto
      }
    });
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    return res.status(500).json({ exito: false, mensaje: 'Error en el servidor.' });
  }
};

//ACUALIZAR PERFIL
export const actualizarPerfil = async (req, res) => {
  const { nombres, apellidos, direccion, correo, telefono, biografia, genero, fecha_nacimiento } = req.body;

  if (!correo) {
    return res.status(400).json({ mensaje: 'El correo es obligatorio.' });
  }

  try {
    // Actualización del perfil en la base de datos
    const [result] = await db.execute(
      `UPDATE estudiantes 
             SET nombres = ?, apellidos = ?, direccion = ?, telefono = ?, biografia = ?, genero = ?, fecha_nacimiento = ?
             WHERE correo = ?`,
      [nombres, apellidos, direccion, telefono, biografia, genero, fecha_nacimiento, correo]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No se encontró el usuario para actualizar.' });
    }

    return res.status(200).json({
      exito: true,
      mensaje: 'Perfil actualizado correctamente.',
    });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return res.status(500).json({ exito: false, mensaje: 'Error en el servidor.' });
  }
};
