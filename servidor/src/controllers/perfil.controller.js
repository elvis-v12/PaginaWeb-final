import db from '../models/dbConnection.js';

export const obtenerPerfil = async (req, res) => {
  const { correo } = req.params; // Recibir el correo desde la URL
  console.log('Correo recibido:', correo);

  try {
    const [estudiante] = await db.execute(
      `SELECT nombres, apellidos, direccion, telefono, biografia, genero, fecha_nacimiento FROM estudiantes WHERE correo = ?`,
      [correo]
    );

    console.log('Datos del estudiante:', estudiante);

    if (!estudiante.length) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado.' });
    }

    res.status(200).json(estudiante[0]); // Enviar los datos del estudiante
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};