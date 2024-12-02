const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5000;

// **Centralización de variables globales**
const BASE_URL = `http://localhost:${port}`;

// **Middleware**
app.use(cors());
app.use(express.json()); // Permite manejar JSON en las solicitudes

// **Configuración de la conexión a MySQL**
const conexion = mysql.createConnection({
  host: "localhost",
  database: "darkode",
  user: "proyect",
  password: "Targaryen_7",
});

// **Conexión a MySQL**
conexion.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err.message);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

// **Ruta para servir el archivo HTML principal**
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html")); // Sirve el archivo admin.html
});

// **Rutas CRUD**
// Obtener administradores
app.get("/administradores", (req, res) => {
  const query = `
    SELECT a.id, a.nombres, a.correo, r.nombre AS rol, a.estado, a.fecha_registro
    FROM administradores AS a
    JOIN roles AS r ON a.rol_id = r.id;
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      console.error("Error en la consulta:", error.message);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.json(results);
  });
});

// Insertar administrador
app.post("/administradores", (req, res) => {
  const { nombres, correo, rol_id, estado } = req.body;

  if (!nombres || !correo || !rol_id || !estado) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = `
    INSERT INTO administradores (nombres, correo, rol_id, estado, fecha_registro)
    VALUES (?, ?, ?, ?, NOW());
  `;
  conexion.query(query, [nombres, correo, rol_id, estado], (error, results) => {
    if (error) {
      console.error("Error al insertar:", error.message);
      return res.status(500).json({ error: "Error al insertar administrador" });
    }
    res.status(201).json({ message: "Administrador insertado correctamente" });
  });
});

// Actualizar administrador
app.put("/administradores/:id", (req, res) => {
  const { id } = req.params;
  const { nombres, correo, rol_id, estado } = req.body;

  if (!nombres || !correo || !rol_id || !estado) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = `
    UPDATE administradores 
    SET nombres = ?, correo = ?, rol_id = ?, estado = ? 
    WHERE id = ?;
  `;
  conexion.query(
    query,
    [nombres, correo, rol_id, estado, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar administrador:", error.message);
        return res
          .status(500)
          .json({ error: "Error al actualizar administrador" });
      }
      res.json({ message: "Administrador actualizado correctamente" });
    }
  );
});

// Desactivar administrador (lógica)
app.delete("/administradores/:id", (req, res) => {
  const { id } = req.params;
  const query = `
    UPDATE administradores
    SET estado = 'Inactivo'
    WHERE id = ?;
  `;
  conexion.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error al desactivar:", error.message);
      return res
        .status(500)
        .json({ error: "Error al desactivar administrador" });
    }
    res.json({ message: "Administrador desactivado correctamente" });
  });
});

// Obtener estudiantes
app.get("/estudiantes", (req, res) => {
  const query = `
    SELECT id_usuario, nombre, email, contrasena, foto_perfil, telefono, fecha_registro, id_suscripcion, id_estado, verificado
    FROM estudiantes;
  `;
  conexion.query(query, (error, results) => {
    if (error) {
      console.error("Error en la consulta de estudiantes:", error.message);
      return res.status(500).json({ error: "Error en la consulta de estudiantes" });
    }
    res.json(results);
  });
});


// **Iniciar el servidor**
app.listen(port, () => {
  console.log(`Servidor corriendo en ${BASE_URL}`);
});
