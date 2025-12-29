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
