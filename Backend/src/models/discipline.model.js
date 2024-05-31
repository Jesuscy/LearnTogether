const mongoose = require('mongoose');

const disciplineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    institutions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution'
    }],
    syllabus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
    }
    
});

module.exports = mongoose.model('Discipline', disciplineSchema,'disciplines');