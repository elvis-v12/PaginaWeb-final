import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz para el documento de Usuario
interface IUsuario extends Document {
  nombre: string;
  correo: string;
  fecha_nacimiento: Date;
  contra: string;
}

// Define el esquema para Usuario
const UsuarioSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true // Asegura que el correo sea único
  },
  fecha_nacimiento: {
    type: Date,
    required: true
  },
  contra: {
    type: String,
    required: true
  }
});

// Crea el modelo a partir del esquema
const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

export default Usuario;
