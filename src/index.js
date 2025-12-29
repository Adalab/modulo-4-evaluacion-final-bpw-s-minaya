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

// POST   /api/vecinos (crear)

server.post("/api/vecinos", async (req, res) => {
  if (!req.body.nombre) {
    // Devolver una respuesta de error.
    return res
      .status(400)
      .json({ success: false, error: "Se esperaba el campo nombre" });
  }

  if (!req.body.personalidad) {
    // Devolver una respuesta de error.
    return res
      .status(400)
      .json({ success: false, error: "Se esperaba el campo personalidad" });
  }

  if (!req.body.cumpleaños) {
    // Devolver una respuesta de error.
    return res
      .status(400)
      .json({ success: false, error: "Se esperaba el campo cumpleaños" });
  }
  if (!req.body.especies_id) {
    // Devolver una respuesta de error.
    return res.status(400).json({
      success: false,
      error:
        "Se esperaba el campo especies_id (1-Gato, 2-Ardilla, 3-Pulpo, 4-Ciervo, 5-Oso)",
    });
  }

  try {
    // 1. Conectarse a la base de datos.
    const conn = await getConnection();

    // 2. Preparar sentencia SQL.
    const insertOneNeighbour = `
        INSERT INTO vecinos(nombre,foto,personalidad,cumpleaños,frase,estilo_casa,especies_id)
        VALUES (?, ?, ?, ?, ?, ?, ?);`;

    // 3. Lanzar la sentencia SQL y obtener los resultados.
    const [result] = await conn.execute(insertOneNeighbour, [
      req.body.nombre,
      req.body.foto,
      req.body.personalidad,
      req.body.cumpleaños,
      req.body.frase,
      req.body.estilo_casa,
      req.body.especies_id,
    ]);

    // 4. Cerrar la conexión con la base de datos.
    await conn.end();

    // 5. Devolver la información.
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    // Devolver una respuesta.
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT   /api/vecinos/:id (modificar)

server.put("/api/vecinos/:id", async (req, res) => {
  if (!req.body.nombre) {
    // Devolver una respuesta de error.
    return res
      .status(400)
      .json({ success: false, error: "Se esperaba el campo nombre" });
  }

  if (!req.body.personalidad) {
    // Devolver una respuesta de error.
    return res
      .status(400)
      .json({ success: false, error: "Se esperaba el campo personalidad" });
  }

  if (!req.body.cumpleaños) {
    // Devolver una respuesta de error.
    return res
      .status(400)
      .json({ success: false, error: "Se esperaba el campo cumpleaños" });
  }
  if (!req.body.especies_id) {
    // Devolver una respuesta de error.
    return res.status(400).json({
      success: false,
      error:
        "Se esperaba el campo especies_id (1-Gato, 2-Ardilla, 3-Pulpo, 4-Ciervo, 5-Oso)",
    });
  }

  try {
    // 1. Conectarse a la base de datos.
    const conn = await getConnection();

    // 2. Preparar sentencia SQL.
    const updateOneNeighbour = `
        UPDATE vecinos
        SET nombre = ?, foto = ?, personalidad = ?, cumpleaños = ?, frase = ?, estilo_casa = ?, especies_id = ?
        WHERE id = ?;`;

    // 3. Lanzar la sentencia SQL y obtener los resultados.
    const [result] = await conn.execute(updateOneNeighbour, [
      req.body.nombre,
      req.body.foto,
      req.body.personalidad,
      req.body.cumpleaños,
      req.body.frase,
      req.body.estilo_casa,
      req.body.especies_id,
      req.params.id,
    ]);

    // 4. Cerrar la conexión con la base de datos.
    await conn.end();

    // 5. Devolver la información.

    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "No se pudieron cambiar los datos" });
    }
  } catch (err) {
    // Devolver una respuesta.
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE   /api/vecinos/:id (borrar)

server.delete("/api/vecinos/:id", async (req, res) => {
  try {
    // 1. Conectarse a la base de datos.
    const conn = await getConnection();

    // 2. Preparar sentencia SQL.
    const deleteOneNeighbour = `
        DELETE FROM vecinos
        WHERE id = ?
        LIMIT 1;`;

    // 3. Lanzar la sentencia SQL y obtener los resultados.
    const [result] = await conn.execute(deleteOneNeighbour, [req.params.id]);

    // 4. Cerrar la conexión con la base de datos.
    await conn.end();

    // 5. Devolver la información.

    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res
        .status(400)
        .json({ success: false, error: "No se pudieron borrar los datos" });
    }
  } catch (err) {
    // Devolver una respuesta.
    res.status(500).json({ success: false, error: err.message });
  }
});
