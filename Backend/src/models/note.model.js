const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    notePath: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    discipline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discipline',
        required: true
    },
    syllabus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Syllabus'
    },
    institution: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: false
    }
});

module.exports = mongoose.model('Note', noteSchema, 'notes');