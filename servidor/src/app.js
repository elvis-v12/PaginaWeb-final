import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import paymentRoutes from './routes/payment.routes.js';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve('./.env') });

console.log('Ruta esperada del archivo .env:', path.resolve('./.env'));
console.log('Stripe Secret Key (depuración):', process.env.STRIPE_SECRET_KEY);

// Inicialización de la aplicación
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir la carpeta cliente como archivos estáticos
app.use(express.static(path.resolve('../cliente')));


// Middleware para archivos estáticos adicionales
app.use('/public', express.static(path.join('..', 'public')));
app.use('/src/js', express.static(path.join('..', 'src', 'js')));

// Configuración de rutas

app.use('/api/payments', paymentRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
