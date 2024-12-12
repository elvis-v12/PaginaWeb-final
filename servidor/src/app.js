import path from 'path';
import { fileURLToPath } from 'url'; // Necesario para __dirname con ES Modules
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';

import serveIndex from 'serve-index'; // Importar serveIndex
import paymentRoutes from './routes/payment.routes.js';
import setupDatabase from './models/dbConnection.js'; // Configuración de la base de datos
import registroRoutes from './routes/registro.routes.js'; // Importar las rutas
import loginRoutes from './routes/login.routes.js';
import loginAdmiRoutes from './routes/loginAdmi.routes.js'; // Nueva ruta de administrador
import adminRoutes from './routes/admin.routes.js';
import RutaCursoA from './routes/curso.routes.js';
//ruta de los clientes cursos 
import cursoCliente from './routes/CursosCliente.routes.js';

import profesoresRoutes from './routes/profesores.routes.js';
import estudiantesRoutes from './routes/estudiantes.routes.js';
import rutasRoutes from './routes/rutas.routes.js';
import becasRoutes from './routes/becas.routes.js';
import cuentaRoutes from './routes/perfil.routes.js';

import graficosRouter from "./routes/Graficos.routes.js";

import CertiRoutes  from "./routes/certificados.routes.js";
//import pagosCliente from "./routes/Pago.routes.js";
import mensajeRoutes from './routes/mensaje.routes.js';
// Configuración de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve('./.env') });
console.log('Ruta esperada del archivo .env:', path.resolve('./.env'));
console.log('Stripe Secret Key (depuración):', process.env.STRIPE_SECRET_KEY);

// Inicialización de la aplicación
const app = express();
const adminFolder = path.resolve('../Administrador');
const upload = multer({
  dest: path.join(__dirname, '../uploads'), // Directorio donde se guardan las imágenes
});

const uploadsPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
    console.log('Carpeta "uploads" creada en:', uploadsPath);
}

// Middlewares
app.use(cors());
app.use(express.json());

// Servir la carpeta cliente como archivos estáticos
app.use(express.static(path.resolve('../cliente')));

// Servir la carpeta Administrador como archivos estáticos bajo el prefijo /admin
app.use('/admin', express.static(adminFolder));


// Middleware para archivos estáticos adicionales
app.use('/public', express.static(path.join('..', 'public')));
app.use('/src/js', express.static(path.join('..', 'src', 'js')));

// Configurar la carpeta Administrador para listar archivos
app.use('/admin', express.static(adminFolder), serveIndex(adminFolder, { icons: true }));

// Configurar carpeta "uploads" como estática (asegurarte de que las imágenes sean accesibles)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
console.log('Ruta configurada para uploads:', path.join(__dirname, '../uploads'));

// Configuración de rutas
app.use('/api/payments', paymentRoutes);
app.use('/api', registroRoutes); // Configura las rutas bajo el prefijo /api
app.use('/api', loginRoutes);

// Agregar nueva ruta para login de administrador
app.use('/api/admin', loginAdmiRoutes);

// Agregar la nueva ruta para traer los datos del administrador
app.use('/api/datosAdmin', adminRoutes);

// Rutas de curso
app.use('/api/curso', RutaCursoA);

// Rutas de profesores
app.use('/api/profesores', profesoresRoutes);

// Rutas de estudiantes
app.use('/api/estudiantes', estudiantesRoutes);

// Rutas de datos de rutas
app.use('/api/datosRutas', rutasRoutes);

// Rutas de becas
app.use('/api/becas', becasRoutes);

// Rutas de cuenta
app.use('/api/cuenta', cuentaRoutes);

//rutas para manejar los en el cliente 
app.use('/api/ClienteCurso',cursoCliente);
// rutas para lo que es graficos 
app.use("/api/GraficosDash", graficosRouter);

//ruta para manejar el pago
//app.use('/api/pagoCliente',pagosCliente);
//ruta para administar los certificados
app.use('/api/datosCertificado',CertiRoutes);


// Rutas de mensajes
app.use("/api/mensaje", mensajeRoutes);
// Rutas de prueba
app.get('/admin/test', (req, res) => {
    res.send('<h1>El módulo Administrador está funcionando correctamente</h1>');
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores internos
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Cliente en: http://localhost:${PORT}`);
    console.log(`Administrador en: http://localhost:${PORT}/admin`);
});
