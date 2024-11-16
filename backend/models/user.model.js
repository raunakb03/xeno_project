const mongoose = require('mongoose');
const { getFormattedDate } = require('../utils/utils');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    total_spend: {
        type: Number,
        required: true
    },
    visit_count: {
        type: Number,
        required: true
    },
    last_visit: {
        type: Date,
        default: getFormattedDate(Date.now)
    }
});

module.exports = mongoose.model('User', userSchema);
