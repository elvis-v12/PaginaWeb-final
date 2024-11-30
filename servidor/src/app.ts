import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import usuarioRoutes from './routes/usuarioRoutes';
import htmlRoutes from './routes/htmlRoutes';

// Inicialización de la aplicación
const app: Application = express();

// Middleware de configuración
app.use(cors());
app.use(express.json());

// Configuración directa de variables
const PORT = 3000; // Cambia este valor si necesitas otro puerto
const DB_URL = 'mongodb://localhost:27017/learnly'; // Cambia la URL según tu base de datos

// Conexión a MongoDB
mongoose.connect(DB_URL)
   .then(() => console.log('Conexión exitosa a MongoDB'))
   .catch(error => console.error('Error al conectar con MongoDB:', error.message));

// Middleware para archivos estáticos
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/src/js', express.static(path.join(__dirname, '..', 'src', 'js')));

// Rutas
app.use('/', htmlRoutes);
app.use('/', usuarioRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
   console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});