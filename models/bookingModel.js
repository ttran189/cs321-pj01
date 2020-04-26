const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    professor: {
        type: String
    },
    uclass: {
        type: String
    },
    day: {
        type: String
    },
    schedule1: {
        type: Boolean
    },
    schedule2: {
        type: Boolean
    },
    schedule3: {
        type: Boolean
    },
    schedule4: {
        type: Boolean
    }
});

const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;