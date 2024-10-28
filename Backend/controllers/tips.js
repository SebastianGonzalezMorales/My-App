// controllers/tips.js

const Tip = require('../models/tips');

// Controlador para obtener un consejo aleatorio según el estado de ánimo
const getTips = async (req, res) => {
  try {
    const { estado } = req.query; // Obtener el estado de ánimo desde los parámetros de la consulta

   // Verificar si se ha proporcionado el estado
   if (!estado) {
    return res.status(400).json({ error: 'Falta el parámetro estado' });
  }

  // Verificar que el estado es válido
  if (!['Mal', 'Regular', 'Bien', 'Excelente'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido. Los estados válidos son: mal, regular, bien, excelente.' });
  }

  // Buscar todos los consejos para el estado dado
  const consejos = await Tip.find({ estado });

  if (consejos.length === 0) {
    return res.status(404).json({ mensaje: 'No se encontraron consejos para el estado dado' });
  }

  // Elegir un consejo aleatorio de la lista
  const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];

  res.json({ consejo: consejoAleatorio.mensaje });
} catch (error) {
  res.status(500).json({ error: 'Error al obtener el consejo' });
}
};

// Controlador para guardar los consejos en la base de datos
const postTips = async (req, res) => {
    try {
        const consejos = req.body; // Suponemos que req.body es un array de objetos
    
        // Validar que se haya enviado un array de consejos
        if (!Array.isArray(consejos)) {
          return res.status(400).json({ error: 'Debe proporcionar un array de consejos.' });
        }
    
        let nuevosConsejosGuardados = 0;
        let consejosDuplicados = 0;
    
        // Iterar sobre cada consejo para guardarlo
        for (const consejo of consejos) {
          const { estado, mensaje } = consejo;
    
          // Validar que estado y mensaje existen
          if (!estado || !mensaje) {
            console.error('Error: Falta estado o mensaje en el consejo:', consejo);
            return res.status(400).json({ error: 'Cada consejo debe tener un estado y un mensaje.' });
          }
    
          // Verificar que el estado sea válido
          if (!['Mal', 'Regular', 'Bien', 'Excelente'].includes(estado)) {
            console.error(`Estado inválido: ${estado}`);
            return res.status(400).json({ error: `Estado inválido: ${estado}. Los estados válidos son: mal, regular, bien, excelente.` });
          }
    
          try {
            // Verificar si ya existe el consejo para evitar duplicados
            const existe = await Tip.findOne({ estado, mensaje });
    
            if (existe) {
              console.log(`El consejo ya existe en la base de datos: Estado = "${estado}", Mensaje = "${mensaje}"`);
              consejosDuplicados++;
            } else {
              const nuevoConsejo = new Tip({
                estado,
                mensaje,
              });
              await nuevoConsejo.save();
              nuevosConsejosGuardados++;
              console.log(`Consejo guardado: Estado = "${estado}", Mensaje = "${mensaje}"`);
            }
          } catch (dbError) {
            console.error(`Error al consultar o guardar el consejo para el estado "${estado}" y mensaje "${mensaje}":`, dbError);
          }
        }
    
        // Definir la respuesta basada en los resultados
        if (nuevosConsejosGuardados > 0 && consejosDuplicados === 0) {
          // Todos los consejos eran nuevos
          res.status(201).json({ mensaje: 'Todos los consejos fueron guardados exitosamente.' });
        } else if (nuevosConsejosGuardados > 0 && consejosDuplicados > 0) {
          // Algunos consejos fueron nuevos y otros duplicados
          res.status(201).json({
            mensaje: 'Algunos consejos fueron guardados exitosamente.',
            nuevosConsejos: nuevosConsejosGuardados,
            duplicados: consejosDuplicados,
          });
        } else if (nuevosConsejosGuardados === 0 && consejosDuplicados > 0) {
          // Todos los consejos ya existían en la base de datos
          res.status(409).json({ mensaje: 'Todos los consejos ya existen en la base de datos y no se guardo ninguno' });
        } else {
          // Si ocurrió algún caso inesperado
          res.status(500).json({ mensaje: 'Error inesperado al procesar los consejos.' });
        }
    
      } catch (error) {
        console.error('Error inesperado al guardar los consejos:', error);
        res.status(500).json({ error: 'Error al guardar los consejos.', detalle: error.message });
      }
    };
    
module.exports = {
  getTips, postTips
};
