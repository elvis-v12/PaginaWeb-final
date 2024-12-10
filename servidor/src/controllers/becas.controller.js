import db from '../models/dbConnection.js'; // Asegúrate de que la conexión está bien configurada

// Controlador para obtener los nombres de las categorías
export const obtenerCategorias = async (req, res) => {
    try {
        // Consulta para obtener solo los nombres de las categorías
        const [categorias] = await db.execute('SELECT nombre_categoria FROM categorias');

        // Extraemos solo los nombres de las categorías
        const categoriasNombres = categorias.map(categoria => categoria.nombre_categoria);

        // Respondemos con los nombres de las categorías
        res.json(categoriasNombres); // Enviamos solo los nombres al cliente
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};


// Controlador para guardar una postulación
export const guardarPostulacion = async (req, res) => {
    const { nombre, dni, correo, motivo, id_categoria, id_curso, nivel } = req.body;

    try {
        // Validación básica
        if (!nombre || !dni || !correo || !id_categoria || !id_curso || !nivel || !motivo) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Consulta SQL para insertar datos en la tabla becas
        const queryBeca = `
            INSERT INTO becas (nombre, dni, correo, motivo, id_categoria, id_curso, nivel)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Ejecutamos la inserción en la tabla becas
        await db.execute(queryBeca, [nombre, dni, correo, motivo, id_categoria, id_curso, nivel]);

        // Consulta SQL para obtener el id_beca recién insertado (si id_beca es autoincremental)
        const [result] = await db.execute('SELECT LAST_INSERT_ID() AS id_beca');
        const idBeca = result[0].id_beca;

        // Ahora, actualizamos la tabla estudiantes con el id_beca correspondiente al correo
        const queryEstudiante = `
            UPDATE estudiantes
            SET id_beca = ?
            WHERE correo = ?
        `;

        // Ejecutamos la actualización de la tabla estudiantes
        await db.execute(queryEstudiante, [idBeca, correo]);

        // Respuesta exitosa
        res.status(201).json({ message: 'Postulación guardada y asignación de beca completada con éxito' });
    } catch (error) {
        console.error('Error al guardar la postulación:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const listarPostulaciones = async (req, res) => {
    try {
        // Consulta SQL para obtener todas las postulaciones con fecha y estado
        const query = `
            SELECT id_beca, nombre, dni, correo, motivo, id_categoria, id_curso, nivel, fecha, estado
            FROM becas
        `;

        // Ejecutar la consulta
        const [rows] = await db.execute(query);

        // Enviar los datos obtenidos como respuesta
        res.status(200).json({ data: rows });
    } catch (error) {
        console.error('Error al listar las postulaciones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para editar una beca
export const editarBeca = async (req, res) => {
    try {
        const { dni, nombre, correo, estado } = req.body; // Extraemos los datos del cuerpo de la solicitud

        // Validación básica
        if (!dni || !nombre || !correo || !estado) {
            return res.status(400).json({ error: 'Todos los campos son requeridos.' });
        }

        // Actualización de la beca en la base de datos
        const query = `
            UPDATE becas 
            SET nombre = ?, correo = ?, estado = ?
            WHERE dni = ?
        `;
        
        // Ejecutar la consulta
        const [result] = await db.execute(query, [nombre, correo, estado, dni]);

        // Verificamos si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No se encontró ninguna beca con ese DNI.' });
        }

        // Si todo sale bien, respondemos con el mensaje de éxito
        res.status(200).json({ message: 'Beca actualizada correctamente.' });
    } catch (error) {
        console.error('Error al actualizar la beca:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
