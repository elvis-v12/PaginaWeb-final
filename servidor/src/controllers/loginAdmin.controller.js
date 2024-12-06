import pool from '../models/dbConnection.js'; // Asegúrate de que la ruta sea correcta

export const loginUser = async (req, res) => {
    console.log('Datos recibidos en el servidor:', req.body); // Depurar datos del cuerpo
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT * FROM login_admin WHERE usuario = ? AND contraseña = ?',
            [email, password]
        );

        if (rows.length > 0) {
            return res.status(200).json({
                message: 'Inicio de sesión exitoso',
                data: rows[0],
                redirectUrl: 'http://127.0.0.1:55601/admin/src/html/Dashboard.html', // URL completa y correcta
            });
        } else {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error al procesar el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
