const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ClassModel'
    },
    slots: {
        type: [Number],
        required: false
    },
    booked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reserve',
        required: false
    }]
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;