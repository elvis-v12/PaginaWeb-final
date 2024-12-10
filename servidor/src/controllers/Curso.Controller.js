import pool from '../models/dbConnection.js';

// Obtener rutas

const obtenerRutas = async (req, res) => {
    try {
        const [rutas] = await pool.query('SELECT id_ruta, nombre_ruta FROM rutas WHERE estado = "Activo"');
        res.status(200).json(rutas);
    } catch (error) {
        console.error('Error al obtener rutas:', error);
        res.status(500).json({ error: 'Error al obtener rutas' });
    }
};
// Obtener categorías
const obtenerCategorias = async (req, res) => {
    try {
        const [categorias] = await pool.query('SELECT id_categoria, nombre_categoria FROM categorias');
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ error: 'Error al obtener categorías' });
    }
};
// Agregar un curso
const agregarCurso = async (req, res) => {
    const { id_ruta, id_categoria, nombre_curso, id_profesor, precio, duracion_horas } = req.body;

    if (!id_ruta || !id_categoria || !nombre_curso || !id_profesor || !precio || !duracion_horas) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    try {
        const query = `
            INSERT INTO cursos (id_ruta, id_categoria, nombre_curso, id_profesor, precio, duracion_horas)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [id_ruta, id_categoria, nombre_curso, id_profesor, precio, duracion_horas]);
        res.status(201).json({ message: 'Curso agregado correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al agregar curso:', error);
        res.status(500).json({ error: 'Error al agregar curso' });
    }
};

// Obtener profesores activos
const obtenerProfesores = async (req, res) => {
    try {
        const [profesores] = await pool.query('SELECT id_profesor, nombres FROM profesores WHERE estado = "Activo"');
        res.status(200).json(profesores);
    } catch (error) {
        console.error('Error al obtener profesores:', error);
        res.status(500).json({ error: 'Error al obtener profesores' });
    }
};

// Listar cursos
const listarCursos = async (req, res) => {
    try {
        const [cursos] = await pool.query('SELECT * FROM cursos');
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Error al listar cursos:', error);
        res.status(500).json({ error: 'Error al listar cursos' });
    }
};

// Agregar sesión a un curso
const agregarSesion = async (req, res) => {
    const { id_curso, titulo_sesion, descripcion, orden, duracion_minutos, url_video } = req.body;

    if (!id_curso || !titulo_sesion || !orden || !duracion_minutos || !url_video) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    try {
        const query = `
            INSERT INTO sesiones (id_curso, titulo_sesion, descripcion, orden, duracion_minutos, url_video)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [id_curso, titulo_sesion, descripcion, orden, duracion_minutos, url_video]);
        res.status(201).json({ message: 'Sesión agregada correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al agregar sesión:', error);
        res.status(500).json({ error: 'Error al agregar sesión' });
    }
};

// Actualizar información básica del curso
const actualizarCurso = async (req, res) => {
    const { id_curso, nombre_curso, id_profesor, precio } = req.body;

    if (!id_curso || !nombre_curso || !id_profesor || !precio) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    try {
        const query = `
            UPDATE cursos 
            SET nombre_curso = ?, id_profesor = ?, precio = ?
            WHERE id_curso = ?
        `;
        await pool.execute(query, [nombre_curso, id_profesor, precio, id_curso]);
        res.status(200).json({ message: 'Curso actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar curso:', error);
        res.status(500).json({ error: 'Error al actualizar curso' });
    }
};

// Actualizar descripción del curso
const actualizarDescripcion = async (req, res) => {
    const { id_curso, descripcion } = req.body;

    if (!id_curso || !descripcion) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    try {
        const query = `
            UPDATE cursos 
            SET descripcion = ?
            WHERE id_curso = ?
        `;
        await pool.execute(query, [descripcion, id_curso]);
        res.status(200).json({ message: 'Descripción actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar descripción:', error);
        res.status(500).json({ error: 'Error al actualizar descripción' });
    }
};

// Agregar videos al curso
// Agregar videos al curso
const agregarVideo = async (req, res) => {
    const videos = req.body;

    if (!Array.isArray(videos) || videos.length === 0) {
        return res.status(400).json({ error: "Debe enviar un array con al menos un video" });
    }

    try {
        const query = `
            INSERT INTO sesiones (id_curso, titulo_sesion, descripcion, orden, duracion_minutos, url_video, titulo_video)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Iterar sobre los videos y ejecutarlos en la base de datos
        for (const video of videos) {
            const { id_curso, titulo_sesion, descripcion, orden, duracion_minutos, url_video, titulo_video } = video;

            if (!id_curso || !titulo_sesion || !descripcion || !orden || !duracion_minutos || !url_video || !titulo_video) {
                return res.status(400).json({ error: "Campos requeridos faltantes en uno o más videos" });
            }

            await pool.execute(query, [id_curso, titulo_sesion, descripcion, orden, duracion_minutos, url_video, titulo_video]);
        }

        res.status(201).json({ message: "Videos agregados correctamente" });
    } catch (error) {
        console.error("Error al agregar videos:", error);
        res.status(500).json({ error: "Error al agregar videos" });
    }
};


// Obtener nombres de los cursos
const obtenerNombresCursos = async (req, res) => {
    try {
        const [cursos] = await pool.query('SELECT id_curso, nombre_curso FROM cursos');
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Error al obtener nombres de cursos:', error);
        res.status(500).json({ error: 'Error al obtener nombres de cursos' });
    }
};


export default { obtenerRutas, obtenerCategorias, agregarCurso, listarCursos, agregarSesion,obtenerProfesores,actualizarCurso,actualizarDescripcion,agregarVideo,obtenerNombresCursos };
