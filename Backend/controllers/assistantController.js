const Assistant = require('../models/Assistant');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Verificar y crear la carpeta "uploads/AssistantsSocials" si no existe
const uploadDir = path.join(__dirname, '../uploads/AssistantsSocials'); // Ruta relativa
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Crear la carpeta si no existe
}

// Configurar multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Guardar en "uploads/AssistantsSocials"
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Validar que el archivo sea una imagen
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp)'));
        }
    }
}).single('imagen'); // Nombre del campo en el formulario

// Obtener asistente por carrera
const getAssistantByCarrera = async (req, res) => {
    try {
        const { carrera } = req.params;

        // Normalizar la búsqueda eliminando espacios extra
        const assistant = await Assistant.findOne({
            carreras: { $regex: `^${carrera.trim()}$`, $options: 'i' }, // Búsqueda exacta sin importar mayúsculas/minúsculas
        });

        if (!assistant) {
            return res.status(404).json({ 
                success: false,
                message: 'No se encontró asistente para esta carrera.' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Asistente encontrado con éxito.',
            assistant
        });
    } catch (error) {
        console.error('Error al obtener asistente:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error interno del servidor.',
            error: error.message // Opcional: Detallar el error en la respuesta
        });
    }
};

// Controlador para subir un asistente social con imagen o URL de imagen
const addAsistente = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error al subir la imagen', error: err.message });
        }

        const { nombre, email, telefono, carreras, ubicacion } = req.body;

        // Validar que todos los campos estén presentes
        if (!nombre || !email || !telefono || !carreras || !ubicacion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        try {
            const nuevoAsistente = new Assistant({
                name: nombre,
                email,
                phone: telefono,
                carreras: carreras.split(',').map((carrera) => carrera.trim()), // Elimina espacios extra en las carreras
                imagen: req.file 
                    ? `${process.env.BASE_URL}/uploads/AssistantsSocials/${req.file.filename}` // Generar la URL completa desde BASE_URL
                    : req.body.imagen, // Usar URL proporcionada si no se sube archivo
                ubicacion,
            });

            await nuevoAsistente.save();

            res.status(201).json({
                success: true,
                message: 'Asistente social agregado exitosamente',
                data: nuevoAsistente,
            });
        } catch (error) {
            console.error('Error al guardar el asistente social:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error al agregar el asistente social',
                error: error.message
            });
        }
    });
};

module.exports = {
    getAssistantByCarrera,
    addAsistente
};
