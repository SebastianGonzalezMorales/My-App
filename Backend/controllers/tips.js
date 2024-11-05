// controllers/tips.js

const Tips = require('../models/tips');

// Controlador para obtener un consejo aleatorio según el estado de ánimo y las actividades
const getTips = async (req, res) => {
  try {
    const { estado, actividades } = req.query; // Obtener el estado de ánimo y actividades desde los parámetros de la consulta

    // Verificar si se ha proporcionado el estado
    if (!estado) {
      return res.status(400).json({ error: 'Falta el parámetro estado' });
    }

    // Verificar que el estado es válido
    if (!['Mal', 'Regular', 'Bien', 'Excelente'].includes(estado)) {
      return res.status(400).json({
        error: 'Estado inválido. Los estados válidos son: Mal, Regular, Bien, Excelente.',
      });
    }

    // Convertir actividades en un array (en caso de que se pase como string)
    let actividadesArray = [];
    if (actividades) {
      actividadesArray = actividades.split(',').map((act) => act.trim());
    }

    // Buscar el documento que coincide con el estado proporcionado
    const tip = await Tips.findOne({ estado });

    // Si no se encuentra el estado, devolver un error
    if (!tip) {
      return res.status(404).json({ mensaje: 'No se encontraron consejos para el estado proporcionado.' });
    }

    let consejoElegido;

    if (actividadesArray.length > 0) {
      // Filtrar los consejos que coinciden con las actividades seleccionadas
      const consejosRelevantes = tip.consejosActividades.filter((ca) =>
        ca.actividades.some((act) => actividadesArray.includes(act))
      );

      if (consejosRelevantes.length > 0) {
        // Seleccionar un consejo relevante aleatorio
        consejoElegido = consejosRelevantes[Math.floor(Math.random() * consejosRelevantes.length)].consejo;
      } else if (tip.consejosGenerales.length > 0) {
        // Si no hay consejos relevantes, elegir un consejo general
        consejoElegido = tip.consejosGenerales[Math.floor(Math.random() * tip.consejosGenerales.length)];
      } else {
        return res.status(404).json({
          mensaje: 'No se encontraron consejos para las actividades proporcionadas.',
        });
      }
    } else if (tip.consejosGenerales.length > 0) {
      // Si no se proporcionaron actividades, elegir un consejo general
      consejoElegido = tip.consejosGenerales[Math.floor(Math.random() * tip.consejosGenerales.length)];
    } else {
      return res.status(404).json({
        mensaje: 'No se encontraron consejos generales para este estado.',
      });
    }

    // Devolver el consejo elegido
    res.json({ consejo: consejoElegido });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el consejo' });
  }
};


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
      const { estado, consejosActividades, consejosGenerales } = consejo;

      // Validar que estado y consejosActividades existen
      if (!estado || !consejosActividades) {
        console.error('Error: Falta estado o consejosActividades en el consejo:', consejo);
        return res.status(400).json({ error: 'Cada consejo debe tener un estado y consejosActividades.' });
      }

      // Verificar que el estado sea válido
      if (!['Mal', 'Regular', 'Bien', 'Excelente'].includes(estado)) {
        console.error(`Estado inválido: ${estado}`);
        return res.status(400).json({ error: `Estado inválido: ${estado}. Los estados válidos son: Mal, Regular, Bien, Excelente.` });
      }

      try {
        // Verificar si ya existe un documento para ese estado
        const existe = await Tips.findOne({ estado });

        if (existe) {
          console.log(`Ya existe un registro para el estado: "${estado}". Actualizando datos...`);

          // Actualizar consejosActividades y consejosGenerales
          existe.consejosActividades = consejosActividades;
          existe.consejosGenerales = consejosGenerales || [];

          await existe.save();
          consejosDuplicados++;
        } else {
          const nuevoConsejo = new Tips({
            estado,
            consejosActividades,
            consejosGenerales: consejosGenerales || [],
          });
          await nuevoConsejo.save();
          nuevosConsejosGuardados++;
          console.log(`Consejo guardado: Estado = "${estado}"`);
        }
      } catch (dbError) {
        console.error(`Error al consultar o guardar el consejo para el estado "${estado}":`, dbError);
      }
    }

    // Definir la respuesta basada en los resultados
    if (nuevosConsejosGuardados > 0 && consejosDuplicados === 0) {
      res.status(201).json({ mensaje: 'Todos los consejos fueron guardados exitosamente.' });
    } else if (nuevosConsejosGuardados > 0 && consejosDuplicados > 0) {
      res.status(201).json({
        mensaje: 'Algunos consejos fueron guardados o actualizados exitosamente.',
        nuevosConsejos: nuevosConsejosGuardados,
        actualizados: consejosDuplicados,
      });
    } else if (nuevosConsejosGuardados === 0 && consejosDuplicados > 0) {
      res.status(200).json({ mensaje: 'Todos los consejos fueron actualizados exitosamente.' });
    } else {
      res.status(500).json({ mensaje: 'Error inesperado al procesar los consejos.' });
    }

  } catch (error) {
    console.error('Error inesperado al guardar los consejos:', error);
    res.status(500).json({ error: 'Error al guardar los consejos.', detalle: error.message });
  }
};

// Controlador para obtener todos los consejos disponibles en la base de datos
const getAllTips = async (req, res) => {
  try {
    // Obtener todos los consejos
    const tips = await Tips.find();

    // Verificar si se encontraron consejos
    if (tips.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron consejos en la base de datos.' });
    }

    // Enviar todos los consejos como respuesta
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los consejos.' });
  }
};


module.exports = {
  getTips,
  postTips,
  getAllTips
};


