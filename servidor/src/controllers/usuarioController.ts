import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario';

export const crearCuenta = async (req: Request, res: Response) => {
    const { nombre, correo, fecha_nacimiento, contra } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contra, 10);
        const nuevoUsuario = new Usuario({ nombre, correo, fecha_nacimiento, contra: hashedPassword });
        await nuevoUsuario.save();
        res.status(200).json({ mensaje: "Usuario registrado exitosamente", exito: true });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ mensaje: "Error al registrar usuario", exito: false });
    }
};

export const iniciarSesion = async (req: Request, res: Response) => {
    const { correo, contra } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        console.log("Usuario encontrado:", usuario); // Agrega esta línea para verificar que el usuario se encuentra

        if (usuario && await bcrypt.compare(contra, usuario.contra)) {
            // Calcular la edad para determinar el CSS
            const birthDate = new Date(usuario.fecha_nacimiento);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            let cssType = '';
            if (age < 10) {
                cssType = 'ninos';
            } else if (age < 18) {
                cssType = 'adolescentes';
            } else {
                cssType = 'adultos';
            }

            console.log("Respuesta enviada:", {
                exito: true,
                mensaje: "Inicio de sesión exitoso",
                css: cssType,
                nombre: usuario.nombre
            });  // Agrega esta línea para verificar lo que está enviando como respuesta

            // Responder con el nombre de usuario, mensaje y tipo de CSS
            res.status(200).json({
                exito: true,
                mensaje: "Inicio de sesión exitoso",
                css: cssType, // Devolvemos el tipo de CSS
                nombre: usuario.nombre
            });
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas", exito: false });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ mensaje: "Error al iniciar sesión", exito: false });
    }
};
