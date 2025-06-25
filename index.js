import pool from "./db.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-new-table", async (req, res) => {
  try {
    const tableName = "new";

    const checkTable = await pool.query("SELECT to_regclass($1) AS exists", [
      tableName,
    ]);

    if (!checkTable.rows[0].exists) {
      await pool.query(`
        CREATE TABLE new (
          id SERIAL PRIMARY KEY,
          nombre TEXT NOT NULL,
          matricula TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      return res
        .status(201)
        .json({ message: "✅ Tabla 'new' creada exitosamente" });
    } else {
      return res.status(200).json({ message: "ℹ️ La tabla ya existe" });
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

app.post("/savestudent", async (req, res) => {
  const { nombre, matricula } = req.body;

  if (!nombre || !matricula) {
    return res
      .status(400)
      .json({ error: "Los campos 'nombre' y 'matricula' son requeridos" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO students (nombre, matricula) VALUES ($1, $2) RETURNING *;",
      [nombre, matricula]
    );

    return res.status(201).json({
      message: "✅ Datos del estudiante guardados exitosamente",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Error al guardar los datos" });
  }
});

app.post("/delete-students-table", async (req, res) => {
  try {
    const tableName = "new";

    const checkTable = await pool.query("SELECT to_regclass($1) AS exists", [
      tableName,
    ]);

    if (checkTable.rows[0].exists) {
      await pool.query(`DROP TABLE ${tableName};`);
      return res
        .status(200)
        .json({ message: "✅ Tabla 'new' borrada exitosamente" });
    } else {
      return res.status(404).json({ message: "ℹ️ La tabla no existe" });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
