module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Este es el preset recomendado para trabajar con Expo.
    plugins: [
      ['module:react-native-dotenv', {
        "moduleName": "@env",
        "path": ".env",  // Configuración para leer el archivo .env
      }]
    ],
  };
};
