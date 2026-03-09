/**
 * PawsHealth - Punto de entrada del servidor
 * Configura Express, middlewares y rutas base.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const petsRoutes = require('../routes/pets.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares base para permitir JSON y peticiones del frontend.
app.use(cors());
app.use(express.json());

// Ruta de verificacion rapida del servidor.
app.get('/', (req, res) => {
  res.send('Servidor de PawsHealth operativo');
});

// Rutas de modulos.
app.use('/api/mascotas', petsRoutes);

// Si alguien llega a una ruta que no existe, respondemos de forma controlada.
app.use((req, res) => {
  res.status(404).json({
    message: 'Ruta no encontrada en la API.',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
