import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://desarrolloiot_qw28_user:1YGHLZXAfCdZkDuEJzrfoK4fh0Ir5n4G@dpg-d1qphe3uibrs73eoj47g-a.oregon-postgres.render.com/desarrolloiot_qw28",

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
