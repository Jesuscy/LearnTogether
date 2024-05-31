const express = require('express')
const noteRouter = require(express.Router)
const {getAllNotes, getNoteById, getNotesByDiscipline, getNotesByInstitution, createNote, updateNote, deleteNote} = require("../controllers/note.controller")

noteRouter.get(getAllNotes)
noteRouter.get(getNoteById)
noteRouter.get(getNotesByDiscipline)
noteRouter.get(getNotesByInstitution)

noteRouter.post()
noteRouter.post()
noteRouter.post()