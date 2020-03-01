const mongoose = require('mongoose');

const ClassModelSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    }
});

const ClassModel = mongoose.model('ClassModel', ClassModelSchema);

module.exports = ClassModel;