const mongoose = require('mongoose');

const WeeklyScheduleSchema = new mongoose.Schema({
    monday: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    tuesday: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    wednesday: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    thursday: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    friday: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    saturday: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    sunday: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
});

const WeeklySchedule = mongoose.model('WeeklySchedule', WeeklyScheduleSchema);

module.exports = WeeklySchedule;