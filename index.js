const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/temperatura", (req, res) => {
  res.json({ valor: "10 °C", timestamp: new Date().toISOString() });
});
app.get("/otro", (req, res) => {
  res.json({ valor: "HOLA ", timestamp: new Date().toISOString() });
});
app.get("/velocidad", (req, res) => {
  res.json({ nombre: "Estrella ", apellido: "Briones Moncada" });
});
app.get("/distancia", (req, res) => {
  res.json({ valor: "200m", timestamp: new Date().toISOString() });
});
app.listen(PORT, () => {
  console.log(`Servidor corregido en puerto ${PORT}`);
});
