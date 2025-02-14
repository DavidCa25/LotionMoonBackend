import app from './app';
import 'reflect-metadata';
import DatabaseConnection from './databsase/DataBaseConnection';// Importa la clase que creaste

const port = 3001;

async function startServer() {
  try {
    await DatabaseConnection.getConnectedInstance(); 
    console.log("Conexión a la base de datos exitosa");

    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1); 
  }
}

startServer();
