import db from '../models/dbConnection.js'; // Asegúrate de que la conexión está bien configurada

// Controlador para guardar un nuevo mensaje y asociarlo con el estudiante
export const guardarMensaje = async (req, res) => {
    const { nombre_cliente, correo_cliente, mensaje_cliente } = req.body; // Datos enviados desde el cliente

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'INSERT INTO soporte_mensajes (nombre_cliente, correo_cliente, mensaje_cliente) VALUES (?, ?, ?)',
            [nombre_cliente, correo_cliente, mensaje_cliente]
        );

        const id_mensaje = result.insertId;
        
        await connection.execute(
            'UPDATE estudiantes SET id_mensaje = ? WHERE correo = ?',
            [id_mensaje, correo_cliente]
        );

        await connection.commit();

        res.status(200).json({
            message: 'Mensaje enviado y asociado correctamente al estudiante.',
            id_mensaje: id_mensaje
        });
    } catch (error) {
  
        await connection.rollback();
        console.error('Error al guardar el mensaje:', error);
        res.status(500).json({ error: 'Error al guardar el mensaje y asociarlo al estudiante.' });
    } finally {
 
        connection.release();
    }
};



// Controlador para listar los mensajes de soporte
export const listarMensajes = async (req, res) => {

    const connection = await db.getConnection();
    try {

        const [result] = await connection.execute(
            'SELECT id_mensaje, nombre_cliente, correo_cliente, mensaje_cliente, fecha_envio, estado_mensaje FROM soporte_mensajes'
        );
        if (result.length > 0) {
            res.status(200).json({
                message: 'Mensajes listados correctamente.',
                mensajes: result
            });
        } else {
            res.status(404).json({
                message: 'No se encontraron mensajes.'
            });
        }
    } catch (error) {
        console.error('Error al listar los mensajes:', error);
        res.status(500).json({
            error: 'Error al listar los mensajes.'
        });
    } finally {

        connection.release();
    }
};



// Controlador para listar los mensajes de soporte con estado_mensaje NULL
export const MensajesBandeja = async (req, res) => {

    const connection = await db.getConnection();
    try {
        // Consulta para obtener los mensajes con estado_mensaje igual a NULL
        const [result] = await connection.execute(
            'SELECT id_mensaje, nombre_cliente, correo_cliente, mensaje_cliente, fecha_envio, estado_mensaje FROM soporte_mensajes WHERE estado_mensaje IS NULL'
        );

        if (result.length > 0) {
            res.status(200).json({
                message: 'Mensajes con estado NULL listados correctamente.',
                mensajes: result
            });
        } else {
            res.status(404).json({
                message: 'No se encontraron mensajes con estado NULL.'
            });
        }
    } catch (error) {
        console.error('Error al listar los mensajes:', error);
        res.status(500).json({
            error: 'Error al listar los mensajes.'
        });
    } finally {
        connection.release();
    }
};



// Controlador para listar los mensajes de soporte con estado_mensaje 'abierto'
export const MensajesAbiertos = async (req, res) => {

    const connection = await db.getConnection();
    try {
        // Consulta para obtener los mensajes con estado_mensaje igual a 'abierto'
        const [result] = await connection.execute(
            'SELECT id_mensaje, nombre_cliente, correo_cliente, mensaje_cliente, fecha_envio, estado_mensaje FROM soporte_mensajes WHERE estado_mensaje = "abierto"'
        );

        if (result.length > 0) {
            res.status(200).json({
                message: 'Mensajes con estado "abierto" listados correctamente.',
                mensajes: result
            });
        } else {
            res.status(404).json({
                message: 'No se encontraron mensajes con estado "abierto".'
            });
        }
    } catch (error) {
        console.error('Error al listar los mensajes:', error);
        res.status(500).json({
            error: 'Error al listar los mensajes.'
        });
    } finally {
        connection.release();
    }
};



// Controlador para cambiar el estado del mensaje a 'cerrado'
export const cerrarMensaje = async (req, res) => {
    const { id } = req.params;  // Obtener el id_mensaje de los parámetros de la URL
  
    // Validación y lógica para cerrar el mensaje
    if (!id) {
      return res.status(400).json({ error: 'Falta el id_mensaje' });
    }
  
    try {
      // Lógica de actualización en la base de datos
      const [result] = await db.execute(
        'UPDATE soporte_mensajes SET estado_mensaje = "cerrado" WHERE id_mensaje = ?',
        [id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Mensaje no encontrado' });
      }
  
      res.status(200).json({ message: 'Mensaje cerrado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al cerrar el mensaje' });
    }
  };
  


  // Controlador para guardar una nueva respuesta
  export const guardarRespuesta = async (req, res) => {
    const { idMensaje } = req.params; // Obtener el ID del mensaje desde la URL
    const { cuerpo_respuesta } = req.body; // Obtener el cuerpo de la respuesta desde el cliente

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Insertar la nueva respuesta
        await connection.execute(
            'INSERT INTO soporte_respuestas (id_mensaje, cuerpo_respuesta) VALUES (?, ?)',
            [idMensaje, cuerpo_respuesta]
        );

        // Actualizar el estado del mensaje a 'abierto' si tiene una respuesta
        await connection.execute(
            'UPDATE soporte_mensajes SET estado_mensaje = "abierto" WHERE id_mensaje = ?',
            [idMensaje]
        );

        await connection.commit();

        res.status(200).json({
            message: 'Respuesta registrada correctamente y el estado del mensaje actualizado.',
        });
    } catch (error) {
        // Si ocurre un error, revertir los cambios
        await connection.rollback();
        console.error('Error al guardar la respuesta:', error);
        res.status(500).json({ error: 'Error al guardar la respuesta.' });
    } finally {
        // Liberar la conexión
        connection.release();
    }
};



export const obtenerRespuestas = async (req, res) => {
    const { idMensaje } = req.params; // Obtener el ID del mensaje desde la URL

    // Validación del ID de mensaje
    if (!idMensaje || isNaN(idMensaje)) {
        return res.status(400).json({ error: 'ID de mensaje inválido.' });
    }

    let connection;
    try {
        connection = await db.getConnection();

        // Consulta para obtener las respuestas por id_mensaje, ordenadas por fecha_envio
        const [respuestas] = await connection.execute(
            'SELECT id_respuesta, remitente, cuerpo_respuesta, fecha_envio FROM soporte_respuestas WHERE id_mensaje = ? ORDER BY fecha_envio DESC',
            [idMensaje]
        );

        res.status(200).json(respuestas);
    } catch (error) {
        console.error('Error al obtener las respuestas:', error);
        res.status(500).json({ error: 'Error al obtener las respuestas. Intenta nuevamente más tarde.' });
    } finally {
        // Liberar la conexión si existe
        if (connection) connection.release();
    }
};




export const obtenerHistorial = async (req, res) => {
    const { correo } = req.query; // Obtener el correo desde la consulta

    // Validación del correo
    if (!correo) {
        return res.status(400).json({ error: 'Se requiere el correo.' });
    }

    let connection;
    try {
        connection = await db.getConnection();

        // Obtener id_mensaje de la tabla estudiantes
        const [estudiante] = await connection.execute(
            'SELECT id_mensaje FROM estudiantes WHERE correo = ?',
            [correo]
        );

        if (!estudiante.length) {
            return res.status(404).json({ error: 'Estudiante no encontrado.' });
        }

        const id_mensaje = estudiante[0].id_mensaje;

        // Obtener el mensaje de soporte
        const [mensaje] = await connection.execute(
            'SELECT * FROM soporte_mensajes WHERE id_mensaje = ?',
            [id_mensaje]
        );

        // Obtener las respuestas relacionadas y ordenarlas por fecha_envio
        const [respuestas] = await connection.execute(
            'SELECT * FROM soporte_respuestas WHERE id_mensaje = ? ORDER BY fecha_envio DESC',
            [id_mensaje]
        );

        // Devolver el mensaje y las respuestas
        res.status(200).json({ mensaje: mensaje[0], respuestas });
    } catch (error) {
        console.error('Error al obtener historial:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    } finally {
        // Liberar la conexión si existe
        if (connection) connection.release();
    }
};