import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://root:Og1lOFCvVNLXDILLOVSthS8bCMtAvEy3@dpg-d0vknm3uibrs73eb3250-a.oregon-postgres.render.com/desarrolloiot",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

// 🔎 Función de prueba de conexión
async function TestConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión exitosa a la base de datos");
    client.release();
  } catch (err) {
    console.error("❌ Error de conexión a la base de datos:", err);
  }
}

TestConnection();
