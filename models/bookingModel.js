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
    text1:{
        type: String
    },
    schedule2: {
        type: Boolean
    },
    text2:{
        type: String
    },
    schedule3: {
        type: Boolean
    },
    text3:{
        type: String
    },
    schedule4: {
        type: Boolean
    },
    text4:{
        type: String
    }
});

const booking = mongoose.model('booking', bookingSchema);

module.exports = booking;