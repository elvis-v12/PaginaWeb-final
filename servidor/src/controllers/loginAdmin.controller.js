import pool from '../models/dbConnection.js'; // Asegúrate de que la ruta sea correcta

export const loginUser = async (req, res) => {
    console.log('Datos recibidos en el servidor:', req.body); // Depurar datos del cuerpo
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios.' });
    }

    try {
        const [rows] = await pool.query(
            `
            SELECT 
                la.usuario,
                la.contraseña,
                SUBSTRING_INDEX(ua.nombre, ' ', 1) AS primer_nombre
            FROM 
                login_admin la
            INNER JOIN 
                usuarios_admin ua 
            ON 
                la.id_usuario = ua.id_usuario
            WHERE 
                la.usuario = ? 
            AND 
                la.contraseña = ?
            `,
            [email, password]
        );
        if (rows.length > 0) {
            const user = rows[0];
            console.log('Resultado de la consulta:', user); // Depuración
            console.log('Primer nombre del usuario:', user.primer_nombre); // Primer nombre recuperado
        
            return res.status(200).json({
                message: 'Inicio de sesión exitoso',
                data: { nombre: user.primer_nombre }, // Devuelve solo el primer nombre
                redirectUrl: '/src/html/Dashboard.html',
            });
        } else {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
        
        
        
        
    } catch (error) {
        console.error('Error al procesar el login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

//cambiar la contraseña 
export const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Correo y nueva contraseña son obligatorios.' });
    }

    try {
        // Verifica si el usuario existe
        const [rows] = await pool.query(
            `SELECT usuario FROM login_admin WHERE usuario = ?`,
            [email]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Actualiza la contraseña
        await pool.query(
            `UPDATE login_admin SET contraseña = ? WHERE usuario = ?`,
            [newPassword, email]
        );

        return res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};