import pool from "../models/dbConnection.js";

// Obtener todos los profesores
export const getProfesores = async (req, res) => {
  const { categoria, estado } = req.query;

  let query = `
    SELECT 
      p.id_profesor AS id,
      p.nombres,
      p.correo,
      p.estado,
      c.nombre_categoria AS categoria,
      cu.nombre_curso AS curso,
      p.fecha_registro
    FROM profesores AS p
    LEFT JOIN categorias AS c ON p.id_categoria = c.id_categoria
    LEFT JOIN cursos AS cu ON p.id_profesor = cu.id_profesor
    WHERE 1=1
  `;

  const queryParams = [];

  if (categoria && categoria !== "all") {
    query += " AND c.nombre_categoria = ?";
    queryParams.push(categoria);
  }

  if (estado && estado !== "all") {
    query += " AND p.estado = ?";
    queryParams.push(estado);
  }

  try {
    const [rows] = await pool.query(query, queryParams);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los profesores:", error.message);
    res.status(500).json({ error: "Error al obtener los profesores" });
  }
};

// Obtener un profesor por ID
export const getProfesorById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT 
        p.id_profesor AS id,
        p.nombres,
        p.correo,
        p.estado,
        c.nombre_categoria AS categoria,
        cu.nombre_curso AS curso,
        p.biografia,
        p.fecha_registro
      FROM profesores AS p
      LEFT JOIN categorias AS c ON p.id_categoria = c.id_categoria
      LEFT JOIN cursos AS cu ON p.id_profesor = cu.id_profesor
      WHERE p.id_profesor = ?;
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener el profesor:", error.message);
    res.status(500).json({ error: "Error al obtener el profesor" });
  }
};

// Crear un nuevo profesor
export const createProfesor = async (req, res) => {
  const { nombres, correo, estado, id_categoria, id_curso, biografia } = req.body;

  // Validar campos obligatorios
  if (!nombres || !correo || !estado || !id_categoria || !id_curso || !biografia) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben ser proporcionados" });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO profesores (nombres, correo, estado, id_categoria, fecha_registro, biografia)
       VALUES (?, ?, ?, ?, NOW(), ?)`,
      [nombres, correo, estado, id_categoria, biografia]
    );

    // Asociar el curso al profesor recién creado
    await pool.query(
      `UPDATE cursos
       SET id_profesor = ?
       WHERE id_curso = ?`,
      [result.insertId, id_curso]
    );

    res.status(201).json({ message: "Profesor creado correctamente", id: result.insertId });
  } catch (error) {
    console.error("Error al crear profesor:", error.message);
    res.status(500).json({ error: "Error al crear el profesor" });
  }
};

// Actualizar un profesor
export const updateProfesor = async (req, res) => {
  const { id } = req.params;
  const { nombres, correo, estado, id_categoria, id_curso, biografia, foto_url } = req.body;

  if (!nombres || !correo || !estado || !id_categoria || !id_curso || !biografia) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben ser proporcionados." });
  }

  try {
    // Iniciar transacción
    await pool.query("START TRANSACTION");

    // Verificar si el curso existe y pertenece a la categoría correcta
    const [cursoCheck] = await pool.query(
      "SELECT * FROM cursos WHERE id_curso = ? AND id_categoria = ?",
      [id_curso, id_categoria]
    );

    if (cursoCheck.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Curso no encontrado o no pertenece a la categoría seleccionada." });
    }

    // Actualizar los datos del profesor
    const [profesorResult] = await pool.query(
      `
      UPDATE profesores
      SET nombres = ?, correo = ?, estado = ?, id_categoria = ?, biografia = ?, foto_url = ?
      WHERE id_profesor = ?;
      `,
      [nombres, correo, estado, id_categoria, biografia, foto_url || null, id]
    );

    if (profesorResult.affectedRows === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Profesor no encontrado." });
    }

    // Asociar el nuevo curso al profesor
    const [cursoUpdateResult] = await pool.query(
      `
      UPDATE cursos
      SET id_profesor = ?
      WHERE id_curso = ?;
      `,
      [id, id_curso]
    );

    if (cursoUpdateResult.affectedRows === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({ error: "Error al actualizar el curso." });
    }

    // Confirmar transacción
    await pool.query("COMMIT");

    res.json({ message: "Profesor y curso actualizados correctamente." });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error al actualizar el profesor y el curso:", error.message);
    res.status(500).json({ error: "Error al actualizar el profesor y el curso." });
  }
};

 // Obtener cursos organizados por categoría
 export const getCoursesByCategory = async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id_categoria,
        c.nombre_categoria AS categoria,
        cu.id_curso,
        cu.nombre_curso
      FROM categorias c
      LEFT JOIN cursos cu ON c.id_categoria = cu.id_categoria
      ORDER BY c.id_categoria;
    `;

    const [rows] = await pool.query(query);

    // Organizar los datos por categoría
    const coursesByCategory = {};
    rows.forEach(({ id_categoria, categoria, id_curso, nombre_curso }) => {
      if (!coursesByCategory[id_categoria]) {
        coursesByCategory[id_categoria] = {
          nombre_categoria: categoria,
          cursos: [],
        };
      }

      if (id_curso) {
        coursesByCategory[id_categoria].cursos.push({
          id_curso,
          nombre_curso,
        });
      }
    });

    res.json(coursesByCategory);
  } catch (error) {
    console.error("Error al obtener categorías y cursos:", error.message);
    res.status(500).json({ error: "Error al obtener categorías y cursos" });
  }
};

  