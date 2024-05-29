const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    website: String
});

module.exports = mongoose.model('Institution', institutionSchema,'institutions');