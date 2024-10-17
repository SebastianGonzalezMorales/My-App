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
  



module.exports = {
    getMoodStates,
    postMoodState,
    getMoodStatesByUserId
};
