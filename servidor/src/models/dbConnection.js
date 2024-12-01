import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: '127.0.0.1', // Dirección de tu base de datos
  user: 'root',      // Usuario de tu base de datos
  password: '',      // Contraseña de tu base de datos
  database: 'proyectoweb', // Nombre de tu base de datos
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool; // Exporta directamente el pool
