const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    segmentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Segment',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    success: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Campaign', campaignSchema);
