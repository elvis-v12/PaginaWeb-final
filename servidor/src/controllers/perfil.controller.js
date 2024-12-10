import db from '../models/dbConnection.js';

// Controlador para obtener los datos del estudiante
export const obtenerDatosEstudiante = async (req, res) => {
    try {
        const { correo } = req.params;  // Cambié de req.query a req.params
        
        console.log('Correo recibido:', correo); // Verifica si el correo recibido es correcto
  
        if (!correo) {
            return res.status(400).json({ error: 'El correo es requerido' });
        }
  
        const queryEstudiante = `
            SELECT nombres, fecha_nacimiento, correo, direccion, telefono, biografia, genero, id_beca, id_categoria_preferencia
            FROM estudiantes
            WHERE LOWER(correo) = LOWER(?)
        `;
        
        const [estudiante] = await db.execute(queryEstudiante, [correo]);
  
        console.log('Estudiante encontrado:', estudiante); // Verifica si la consulta devuelve un resultado
  
        if (estudiante.length === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
  
        const estudianteData = estudiante[0];
  
        // Si el estudiante tiene una categoría de preferencia, convertimos su id en el nombre correspondiente
        if (estudianteData.id_categoria_preferencia) {
            const queryCategoria = `
                SELECT nombre_categoria
                FROM categorias
                WHERE id_categoria = ?
            `;
            const [categoria] = await db.execute(queryCategoria, [estudianteData.id_categoria_preferencia]);
  
            if (categoria.length > 0) {
                estudianteData.categoria_preferencia = categoria[0].nombre_categoria;
            } else {
                estudianteData.categoria_preferencia = null;
            }
        } else {
            estudianteData.categoria_preferencia = null;
        }
  
        // Si el estudiante tiene una beca, obtener el estado de la beca
        if (estudianteData.id_beca) {
            const queryBeca = `
                SELECT estado
                FROM becas
                WHERE id_beca = ?
            `;
            const [beca] = await db.execute(queryBeca, [estudianteData.id_beca]);
  
            if (beca.length > 0) {
                estudianteData.estado_beca = beca[0].estado;  // Asignamos el estado de la beca al estudianteData
            } else {
                estudianteData.estado_beca = null;  // Si no se encuentra el estado, asignamos null
            }
        } else {
            estudianteData.estado_beca = null;  // Si no tiene beca, asignamos null
        }

        res.status(200).json({ data: estudianteData });
    } catch (error) {
        console.error('Error al obtener los datos del estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// Controlador para actualizar los datos del perfil
export const actualizarDatosEstudiante = async (req, res) => {
    const { correo } = req.params;  // Obtener correo del estudiante
    const { nombres, direccion, telefono, biografia, genero, fecha_nacimiento, temas_interes } = req.body;

    try {
        // Primero, obtenemos las categorías con sus ids
        const [categorias] = await db.execute('SELECT id_categoria, nombre_categoria FROM categorias');

        // Crear un mapa de las categorías con nombre -> id_categoria
        const categoriasMap = categorias.reduce((acc, categoria) => {
            acc[categoria.nombre_categoria] = categoria.id_categoria;
            return acc;
        }, {});

        // Convertir los nombres de las categorías seleccionadas a sus respectivos id_categoria
        let idCategoriasSeleccionadas = [];
        if (temas_interes && temas_interes.length > 0) {
            idCategoriasSeleccionadas = temas_interes
                .map(tema => categoriasMap[tema])  // Convertimos el nombre en id_categoria
                .filter(id => id !== undefined);  // Filtramos cualquier valor que no tenga match
        }

        // Si no se seleccionaron categorías, establecemos el valor como null
        const idCategoriaPreferencia = idCategoriasSeleccionadas.length > 0 ? idCategoriasSeleccionadas[0] : null;

        // Actualizamos la base de datos con los datos nuevos
        const queryUpdate = `
            UPDATE estudiantes
            SET nombres = ?, direccion = ?, telefono = ?, biografia = ?, genero = ?, fecha_nacimiento = ?, id_categoria_preferencia = ?
            WHERE correo = ?
        `;
        
        // Ejecutamos la consulta para actualizar los datos
        await db.execute(queryUpdate, [
            nombres,
            direccion,
            telefono,
            biografia,
            genero,
            fecha_nacimiento,
            idCategoriaPreferencia, // Guardamos el id_categoria
            correo
        ]);

        res.status(200).json({ message: 'Perfil actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};

  
  