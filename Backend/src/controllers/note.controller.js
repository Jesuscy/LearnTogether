const Note = require("../models/note.model")
const HTTPSTATUSCODE = require('../utils/httpStatusCode')

//Obtengo todos los contenidos 
const getAllNotes = async (req,res) => {
    try {
        //
        const notes = await Note.find().populate('uploadedBy').populate('discipline')
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json(error)
    }
};

//Obtengo un contenido por id.
const getNoteById = async (req,res) => {
    try {
        const id = req.body
        const note = await Note.findById(id).populate('uploadedBy').populate('discipline')
        if (!note) {
            throw new Error('Note not found')
        }
        return res.status(200).json(note)
    } catch (error) {
        return res.status(500).json(error)
    }
};

//Obtengo el contenido de una disciplina.
const getNotesByDiscipline = async (req,res) => {
    try {
        const disciplineId = req.body
        const notes = await Note.find({ discipline: disciplineId }).populate('uploadedBy').populate('discipline')
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json(error)
    }
};
//Obtengo todas las notas asociadas a una institución
const getNotesByInstitution = async (req,res) => {
    try {
        const institutionId = req.body
        const notes = await Note.find({ institution: institutionId }).populate('uploadedBy').populate('discipline').populate('institution')
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json(error)
    }
};

//Obtengo todas las notas asociadas a un temario.
const getNotesBySyllabus = async (req, res) => {
    try {
        const { id } = req.body

        // Buscar todas las notas que estén asociadas al syllabus
        const notes = await Note.find({ syllabus: id })
        return res.status(200).json(notes)
    } catch (error) {
        return res.status(500).json({ message: 'Error getting notes by syllabus: ' + error.message })
    }
};

// Create
const createNote = async (req,res) => {
    try {
        const noteData = req.body
        const newNote = new Note(noteData)
        await newNote.save();
        return res.status(200).json(newNote)
    } catch (error) {
        return res.status(500).json(error)
    }
};



// Update
const updateNote = async (req,res) => {
    try {
        const {id, updatedData} = req.body
        const note = await Note.findByIdAndUpdate(id, updatedData, { new: true }).populate('uploadedBy').populate('discipline')
        if (!note) {
            throw new Error('Note not found')
        }
        return res.status(200).json(note)
    } catch (error) {
        return res.status(500).json(error)
    }
};

// Delete
const deleteNote = async (req,res) => {
    try {
        const id = req.body
        const note = await Note.findByIdAndDelete(id)
        if (!note) {
            throw new Error('Note not found')
        }
        return res.status(200).json(note)
    } catch (error) {
        return res.status(500).json(error)
    }
};


module.exports = {getAllNotes, getNoteById, getNotesByDiscipline, getNotesByInstitution, createNote, updateNote, deleteNote}