const { Question } = require('../models/questions');


const createQuestion = async (req, res) => {
    try {
      const question = new Question(req.body);
      await question.save();
      res.status(201).json(question);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Obtener todas las preguntas
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una pregunta por ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una pregunta

const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!question) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una pregunta
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};