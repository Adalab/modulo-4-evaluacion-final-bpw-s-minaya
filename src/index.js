// -------- SECCIÓN IMPORTS ------------
// Importar la biblioteca de Express

const express = require("express");

// Importar la biblioteca de CORS

const cors = require("cors");

// Importar biblioteca de variables de entorno
require("dotenv").config();

// Importar la biblioteca de MySQL
const mysql = require("mysql2/promise");

// -------- SECCIÓN DE CONFIGURACIÓN DE EXPRESS ------------
const server = express();
// Configuramos Express para que funcione bien como API

server.use(cors());
server.use(express.json({ limit: "25Mb" }));

// -------- SECCIÓN DE CONFIGURACIÓN DE MYSQL ------------

// Configuración de MySQL

const getConnection = async () => {
  const datosConexion = {
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_SCHEMA || "animal_crossing",
  };

  const conn = await mysql.createConnection(datosConexion);
  await conn.connect();

  return conn;
};

// -------- INICIAMOS EXPRESS ------------
//Arrancar el servidor en el puerto 3000

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Uh! El servidor ya está arrancado: <http://localhost:${port}/>`);
});

// -------- SECCIÓN DE ENDPOINTS ------------

server.get("/", (req, res) => {
  res.send("Está todo ok!");
});

// ENDPOINTS PARA EL API

// GET    /api/vecinos    -> [{},{}] (listar)

server.get("/api/vecinos", async (req, res) => {
  try {
    const conn = await getConnection();

    // 2. Preparar sentencia SQL (query).
    const selectAllNeighbours = `
      SELECT 
      vecinos.id AS vecino_id,
      vecinos.nombre AS vecino_nombre,
      vecinos.foto,
      vecinos.personalidad,
      vecinos.cumpleaños,
      vecinos.frase,
      vecinos.estilo_casa,
      especies.id AS especie_id,
      especies.nombre AS especie_nombre,
      especies.descripcion AS especie_descripcion
       FROM vecinos
       JOIN especies
       ON vecinos.especies_id = especies.id;`;

    // 3. Lanzar la sentencia SQL y obtener los resultados.
    const [results] = await conn.query(selectAllNeighbours);

    // 4. Cerrar la conexión con la base de datos.
    await conn.end();

    // 5. Devolver la información.
    res.json({ success: true, vecinos: results });
  } catch (err) {
    // Devolver una respuesta
    res.json({ success: false, error: err.message });
  }
});
