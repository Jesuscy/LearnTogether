const Syllabus = require('../models/syllabus.model');


// Método para obtener todos los syllabus
const getAllSyllabus = async (req, res) => {
    try {
        const syllabusList = await Syllabus.find();
        return res.status(200).json(syllabusList);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting all syllabus: ' + error.message });
    }
};

// Método para obtener un syllabus por su ID
const getSyllabusById = async (req, res) => {
    try {
        const { id } = req.body;
        const syllabus = await Syllabus.findById(id);
        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }
        return res.status(200).json(syllabus);
    } catch (error) {
        return res.status(500).json({ message: 'Error getting syllabus by ID: ' + error.message });
    }
};

// Método para crear un nuevo syllabus
const createSyllabus = async (req, res) => {
    try {
        const syllabusData = req.body;
        const newSyllabus = new Syllabus(syllabusData);
        await newSyllabus.save();
        return res.status(201).json(newSyllabus);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating syllabus: ' + error.message });
    }
};


// Método para actualizar un syllabus
const updateSyllabus = async (req, res) => {
    try {
        const { id ,updatedData } = req.body;
        const updatedSyllabus = await Syllabus.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedSyllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }
        return res.status(200).json(updatedSyllabus);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating syllabus: ' + error.message });
    }
};

// Método para eliminar un syllabus
const deleteSyllabus = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedSyllabus = await Syllabus.findByIdAndDelete(id);
        if (!deletedSyllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }
        return res.status(200).json(deletedSyllabus);
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting syllabus: ' + error.message });
    }
};


// Método para añadir un nuevo tema a un syllabus existente
const addTopicToSyllabus = async (req, res) => {
    try {
        const { id, nombreTema, archivosTema } = req.body; 
        
        // Buscar el syllabus por su ID
        const syllabus = await Syllabus.findById(id);
        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }
        
        // Añadir el nuevo tema al array de temas del syllabus
        syllabus.topics.push({ nombreTema, archivosTema });
        
        // Guardar el syllabus actualizado en la base de datos
        await syllabus.save();
        
        // Devolver el syllabus actualizado
        return res.status(200).json(syllabus);
    } catch (error) {
        return res.status(500).json({ message: 'Error adding topic to syllabus: ' + error.message });
    }
};

module.exports = {createSyllabus, getAllSyllabus, getSyllabusById, updateSyllabus, deleteSyllabus, addTopicToSyllabus};
