const mongoose = require('mongoose');

const ProfessorEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
});

const ProfessorEmail = mongoose.model('ProfessorEmail', ProfessorEmailSchema);

module.exports = ProfessorEmail;