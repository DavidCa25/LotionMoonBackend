import express from 'express';
import DatabaseConnection from './databsase/DataBaseConnection';
import router from './presentation/lotions/router';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Conectar a la base de datos

DatabaseConnection.getConnectedInstance()
  .then(() => console.log('📦 Base de datos conectada'))
  .catch((error) => console.error('❌ Error al conectar la base de datos:', error));

// Rutas
app.use('/api', router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
