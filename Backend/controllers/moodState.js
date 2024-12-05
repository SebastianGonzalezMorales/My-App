const { MoodState } = require('../models/moodState');


//const { authJwt }

// Controlador para obtener todos los estados de ánimo
const getMoodStates = async (req, res) => {
    try {
        const moodState = await MoodState.find();
        if (!moodState) {
            return res.status(500).json({ success: false });
        }
        res.send(moodState);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para crear un nuevo estado de ánimo
const postMoodState = async (req, res) => {
    try {
      const moodState = new MoodState({
        userId: req.auth.userId,  // Obtén el userId del token JWT
        mood_state: req.body.mood_state,
        intensidad: req.body.intensidad,
        Activities: req.body.Activities,
        title: req.body.title,
        comentarios: req.body.comentarios
      });
  
      const createdMoodState = await moodState.save();
      res.status(201).json({
        success: true,
        documentId: createdMoodState._id  // Devolver el ID del documento
      });
    } catch (err) {
      console.error('Error en el servidor:', err);  // Registrar el error en los logs del servidor
      res.status(500).json({
        success: false,
        message: 'Error en el servidor al guardar el estado de ánimo',
        error: err.message // Detalles adicionales del error
      });
    }
  };
  
  const getMoodStatesByUserId = async (req, res) => {
    try {
      const moodStates = await MoodState.find({ userId: req.auth.userId });
      
      if (moodStates.length === 0) {
        // Si no hay estados de ánimo, devuelve un mensaje pero con éxito (200)
        return res.status(200).json({
          success: true,
          message: 'No se encontraron estados de ánimo para este usuario.',
          data: [],  // Devolvemos una lista vacía en lugar de un error
        });
      }
  
      // Si hay estados de ánimo, devuelve los datos
      res.status(200).json({
        success: true,
        data: moodStates,
      });
  
    } catch (err) {
      // En caso de error, manejarlo adecuadamente
      res.status(500).json({
        success: false,
        message: 'Error al obtener los estados de ánimo',
        error: err.message,
      });
    }
  };

  const getMoodStateById = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el ID es válido
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'ID inválido' });
        }

        // Buscar el estado de ánimo en la base de datos
        const moodState = await MoodState.findById(id);

        if (!moodState) {
            return res.status(404).json({ success: false, message: 'Estado de ánimo no encontrado' });
        }

        res.status(200).json({ success: true, data: moodState });
    } catch (error) {
        console.error('Error al obtener el estado de ánimo:', error);
        res.status(500).json({ success: false, message: 'Error del servidor', error: error.message });
    }
};
const calculateWeeklyStreak = async (req, res) => {
  try {
      // Obtener los estados de ánimo del usuario
      const moodStates = await MoodState.find({ userId: req.auth.userId }).sort({ date: -1 });

      if (moodStates.length === 0) {
          return res.status(200).json({
              success: true,
              progress: 0,
              goal: 7, // Meta de días consecutivos en la semana
              message: 'Aún no has registrado tu estado de ánimo esta semana. 🌱 ¡Empieza hoy para alcanzar tu meta! 💪',
          });
      }

      // Obtener la fecha actual y la semana actual
      const today = new Date();
      const currentWeekStart = getWeekStart(today);

      // Filtrar los registros que pertenezcan a la semana actual
      const currentWeekRecords = moodStates.filter((mood) => {
          const moodDate = new Date(mood.date);
          return moodDate >= currentWeekStart && moodDate <= today; // Solo fechas dentro de la semana actual
      });

      // Eliminar duplicados por día (si hay múltiples registros en el mismo día)
      const uniqueDates = new Set(
          currentWeekRecords.map((mood) => new Date(mood.date).toISOString().split('T')[0])
      );

      // Progreso: cantidad de días únicos registrados en esta semana
      const progress = uniqueDates.size;

      // Ajustar el mensaje
      let message = '';
      if (progress === 0) {
          message = 'Aún no has registrado tu estado de ánimo esta semana. 🌱 ¡Empieza hoy para alcanzar tu meta! 💪';
      } else if (progress === 1) {
          message = 'Has registrado tu estado de ánimo un día esta semana. ✨ ¡Sigue así para alcanzar tu meta de 7 días! 🌟';
      } else {
          message = `Has registrado tu estado de ánimo durante ${progress} días esta semana. 🗓️ ¡Sigue así, vas genial! 🚀`;
      }

      res.status(200).json({
          success: true,
          progress: progress,
          goal: 7,
          message: message,
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: 'Error al calcular el progreso semanal 😓',
          error: error.message,
      });
  }
};

// Función auxiliar para obtener el inicio de la semana (lunes)
function getWeekStart(date) {
  const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Ajustar para que la semana comience en lunes
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() + diff); // Restar los días necesarios
  weekStart.setHours(0, 0, 0, 0); // Reiniciar la hora
  return weekStart;
}


  



module.exports = {
    getMoodStates,
    postMoodState,
    getMoodStatesByUserId,
    getMoodStateById,
    calculateWeeklyStreak
};
