const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Corrección del nombre
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const favicon = require('serve-favicon');
const dotenv = require('dotenv'); //

// Determina el entorno actual, por defecto 'development'
const env = process.env.NODE_ENV || 'development';

// Construye la ruta al archivo .env correspondiente
const envPath = path.resolve(__dirname, `.env.${env}`);

// Carga las variables de entorno
const result = dotenv.config({ path: envPath });

if (result.error) {
  throw result.error;
}

// Importar middlewares personalizados
const authJwt = require('./middlewares/jwt');
const errorHandler = require('./helpers/error-handler');

// Configuración global de middlewares
app.use(cors()); // Habilitar CORS para todas las solicitudes
app.options('*', cors()); // Habilitar preflight para solicitudes CORS

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir favicon desde la carpeta pública
app.use(favicon(path.join(__dirname, 'public', 'Icon_Application_Blue.png')));

// Middleware para parsear JSON en las solicitudes
app.use(bodyParser.json());

// Middleware para registrar solicitudes HTTP en la consola
app.use(morgan('tiny'));

// Middleware de autenticación (JWT)
app.use(authJwt);

// Middleware para manejar errores globales
app.use(errorHandler);

// Exponer la carpeta "uploads" como pública
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar y registrar todas las rutas de la aplicación desde el archivo central de rutas
const routes = require('./routes');
routes(app);

// Ruta raíz para pruebas básicas
app.get('/', (req, res) => {
  res.send('<h1> Funcionando </h1>');
});

app.use('/public', express.static(path.join(__dirname, 'public')));

// Conectar a la base de datos MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'my-app', // Nombre de la base de datos
  })
  .then(() => {
    console.log('Database Connection is ready...');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`API Base URL: ${process.env.API_URL}`);
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Manejo de cierre de aplicación
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Process terminated. Server closed.');
    process.exit(0);
  });
});