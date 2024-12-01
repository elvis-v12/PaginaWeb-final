import db from '../models/dbConnection.js';
import bcrypt from 'bcrypt';

// Función para calcular la edad
const calcularEdad = (fechaNacimiento) => {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
};

// Función para determinar el rango de edad
const determinarRangoEdad = (edad) => {
  if (edad < 10) {
    return 'ninos';
  } else if (edad < 18) {
    return 'adolescentes';
  } else {
    return 'adultos';
  }
};

export const registrarUsuario = async (req, res) => {
  const { nombres, correo, fecha_nacimiento, contrasena } = req.body;

  if (!nombres || !correo || !fecha_nacimiento || !contrasena) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
  }

  const fecha_registro = new Date();
  const edad = calcularEdad(fecha_nacimiento);
  const rango_edad = determinarRangoEdad(edad);

  try {
    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Insertar en la tabla estudiantes con el rango de edad
    const [result] = await db.execute(
      `INSERT INTO estudiantes (nombres, fecha_nacimiento, correo, fecha_registro, rango_edad) VALUES (?, ?, ?, ?, ?)`,
      [nombres, fecha_nacimiento, correo, fecha_registro, rango_edad]
    );

    const idEstudiante = result.insertId;

    // Insertar en la tabla login con la contraseña encriptada
    await db.execute(
      `INSERT INTO login (correo, contraseña, id_estudiante) VALUES (?, ?, ?)`,
      [correo, hashedPassword, idEstudiante]
    );

    res.status(201).json({ exito: true, mensaje: 'Registro exitoso.' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ exito: false, mensaje: 'Error en el servidor.' });
  }
};
