import path from 'path';
import dotenv from 'dotenv';
import { Router } from 'express';
import stripe from 'stripe';

const router = Router();

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve('./.env') });

// Validación de STRIPE_SECRET_KEY
if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Error: STRIPE_SECRET_KEY no está definida. Revisa el archivo .env.');
    process.exit(1); // Detener el servidor si no se define la clave
}

// Inicializar Stripe con la clave secreta
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
console.log('Stripe Initialized with Secret Key:', process.env.STRIPE_SECRET_KEY); // Depuración

// Ruta para procesar pagos
router.post('/process-payment', async (req, res) => {
    const { token, amount } = req.body;

    // Validación de datos de entrada
    if (!token || !amount) {
        return res.status(400).json({
            success: false,
            message: 'El token y el monto son obligatorios.',
        });
    }

    try {
        // Crear Intento de Pago
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Math.round(amount * 100), // Convertir dólares a centavos
            currency: 'usd',
            payment_method_data: {
                type: 'card',
                card: { token }, // Token recibido del cliente
            },
            confirm: true, // Confirmar inmediatamente
        });

        // Responder con éxito
        res.status(200).json({
            success: true,
            paymentIntent,
        });
    } catch (error) {
        console.error('Error procesando el pago:', error.message || error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error desconocido',
        });
    }
});

export default router;
