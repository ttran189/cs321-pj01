const mongoose = require('mongoose');

const ReserveSchema = new mongoose.Schema({
    date: Date,
    appointment: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        slots: {
            type: [Number],
            require: false
        }
    }]
});

const Reserve = mongoose.model('WeeklySchedule', ReserveSchema);

module.exports = Reserve;