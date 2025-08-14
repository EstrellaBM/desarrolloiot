import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://desarrolloiot_vg8k_user:2xBvsMzmaDYJA14Fjhz3I42AHzZKOGly@dpg-d2f2n38dl3ps73eegnug-a.oregon-postgres.render.com/desarrolloiot_vg8k",

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
