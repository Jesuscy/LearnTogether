const mongoose = require('mongoose')

const syllabusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    topics: [
        {
            nombreTema: {
                type: String,
                required: true
            },
            archivosTema: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Note'
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Syllabus', syllabusSchema,'syllabus');