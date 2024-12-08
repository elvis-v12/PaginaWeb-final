import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import serveIndex from 'serve-index'; // Importar serveIndex

import paymentRoutes from './routes/payment.routes.js';
import setupDatabase from './models/dbConnection.js'; // Configuración de la base de datos
import registroRoutes from './routes/registro.routes.js'; // Importar las rutas
import loginRoutes from './routes/login.routes.js';
import loginAdmiRoutes from './routes/loginAdmi.routes.js'; // Nueva ruta de administrador
import adminRoutes from "./routes/admin.routes.js";
import cursoRoutes  from "./routes/curso.routes.js";
import cursoCliente  from "./routes/CursosCliente.routes.js";
// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve('./.env') });

console.log('Ruta esperada del archivo .env:', path.resolve('./.env'));
console.log('Stripe Secret Key (depuración):', process.env.STRIPE_SECRET_KEY);

// Inicialización de la aplicación
const app = express();
const adminFolder = path.resolve('../Administrador');

// Middlewares
app.use(cors());
app.use(express.json());

// Servir la carpeta cliente como archivos estáticos
app.use(express.static(path.resolve('../cliente')));
//app.use(express.static(path.join(__dirname, 'cliente/src')));
// Servir la carpeta Administrador como archivos estáticos bajo el prefijo /admin
app.use('/admin', express.static(path.resolve('../Administrador')));

// Middleware para archivos estáticos adicionales
app.use('/public', express.static(path.join('..', 'public')));
app.use('/src/js', express.static(path.join('..', 'src', 'js')));

// Configurar la carpeta Administrador para listar archivos
app.use('/admin', express.static(adminFolder), serveIndex(adminFolder, { icons: true }));
// Configuración de rutas
app.use('/api/payments', paymentRoutes);
app.use('/api', registroRoutes); // Configura las rutas bajo el prefijo /api
app.use('/api', loginRoutes);
// Agregar nueva ruta para login de administrador
app.use('/api/admin', loginAdmiRoutes); // Sin conflicto

//Agregar la nueva ruta para traer los datos del administrador
app.use("/api/datosAdmin", adminRoutes);

// Rutas para el administrador de cursos (ruta con prefijo /admin)
app.use('/api/admin/cursos', cursoRoutes); // Acceso solo a administradores

// Rutas para el cliente que ve los cursos (ruta con prefijo /client)
app.use('/api/client/cursos', cursoCliente); // Acceso público a los cursos

app.get('/admin/test', (req, res) => {
    res.send('<h1>El módulo Administrador está funcionando correctamente</h1>');
});
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Cliente en: http://localhost:${PORT}`);   
    console.log(`Administrador en: http://localhost:${PORT}/admin`);
});