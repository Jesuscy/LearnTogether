const mongoose = require('mongoose');
const Discipline = require('../models/discipline.model'); 


//Obtener todas las disciplinas
const getAllDisciplines = async (req, res) => {
    try {
        const disciplines = await Discipline.find()
            .populate('institutions') // Obtengo la institución
            .populate({
                path: 'syllabus.notes', // Obtengo los "temarios" de la disciplina.
                populate: { path: 'notes' } //Obtengo el contenido de los temarios.
            });
            return res.status(200).json(disciplines);
        } catch (error) {
            return res.status(500).json(error);
        }
};

//Obtener disciplinas por id.
const getDisciplineById = async (req, res) => {
    try {
        const id = req.body 
        const discipline = await Discipline.findById(id)
            .populate('institutions') 
            .populate({
                path: 'syllabus.notes',
                populate: { path: 'notes' } 
            });
        if (!discipline) {
            throw new Error('Discipline not found');
        }
        return res.status(200).json(discipline);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Obtener disciplinas por institución.
const getDisciplinesByInstitution = async (req, res) => {
    try {
        const institutionId = req.body
        const disciplines = await Discipline.find({ institutions: institutionId })
            .populate('institutions') 
            .populate({
                path: 'syllabus.notes',
                populate: { path: 'notes' } 
            });
        if (disciplines.length === 0) {
            return res.status(404).json({ message: 'No disciplines found for this institution' });
        }
        return res.status(200).json(disciplines);
    } catch (error) {
        return res.status(500).json(error);
    }
};

//Crear Disciplina
const createDiscipline = async (req, res) => {
    try {
        const disciplineData = req.body 
        const newDiscipline = new Discipline(disciplineData);
        await newDiscipline.save();
        return res.status(200).json(newDiscipline);
        
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Editar Disciplina
const updateDiscipline = async (req, res) => {
    try {
        const {id, updatedData} = req.body 
        const discipline = await Discipline.findByIdAndUpdate(id, updatedData, { new: true })
            .populate('institutions') 
            .populate({
                path: 'syllabus.notes', 
                populate: { path: 'notes' } 
            });
        if (!discipline) {
            throw new Error('Discipline not found');
        }
        return res.status(200).json(discipline);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Borrar Disciplina
const deleteDiscipline = async (req, res) => {
    try {
        const id = req.body 
        const discipline = await Discipline.findByIdAndDelete(id);
        if (!discipline) {
            throw new Error('Discipline not found');
        }
        return res.status(200).json(discipline);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {createDiscipline, getAllDisciplines, getDisciplineById, getDisciplinesByInstitution, updateDiscipline, deleteDiscipline}