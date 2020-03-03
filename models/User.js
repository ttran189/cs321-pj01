const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "0"
    },
    verified: {
        type: Boolean,
        default: false
    },
    activation: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    scheduleCount: {
        type: Number,
        default: 0
    },
    schedule: {
        monday: [{
            classCode: {
                type: String,
                required: false
            },
            appLength: {
                type: Number,
                required: false
            },
            slots: {
                type: [Number],
                required: false
            },
            lastUpdate: {
                type: Date,
                default: Date.now
            }
        }],
        tuesday: [{
            classCode: {
                type: String,
                required: false
            },
            appLength: {
                type: Number,
                required: false
            },
            slots: {
                type: [Number],
                required: false
            },
            lastUpdate: {
                type: Date,
                default: Date.now
            }
        }],
        wednesday: [{
            classCode: {
                type: String,
                required: false
            },
            appLength: {
                type: Number,
                required: false
            },
            slots: {
                type: [Number],
                required: false
            },
            lastUpdate: {
                type: Date,
                default: Date.now
            }
        }],
        thursday: [{
            classCode: {
                type: String,
                required: false
            },
            appLength: {
                type: Number,
                required: false
            },
            slots: {
                type: [Number],
                required: false
            },
            lastUpdate: {
                type: Date,
                default: Date.now
            }
        }],
        friday: [{
            classCode: {
                type: String,
                required: false
            },
            appLength: {
                type: Number,
                required: false
            },
            slots: {
                type: [Number],
                required: false
            },
            lastUpdate: {
                type: Date,
                default: Date.now
            }
        }],
        saturday: [{
            classCode: {
                type: String,
                required: false
            },
            appLength: {
                type: Number,
                required: false
            },
            slots: {
                type: [Number],
                required: false
            },
            lastUpdate: {
                type: Date,
                default: Date.now
            }
        }],
        sunday: [{
            classCode: {
                type: String,
                required: false
            },
            appLength: {
                type: Number,
                required: false
            },
            slots: {
                type: [Number],
                required: false
            },
            lastUpdate: {
                type: Date,
                default: Date.now
            }
        }]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;