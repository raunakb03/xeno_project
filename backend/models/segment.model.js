const mongoose = require('mongoose');

const SegmentSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    userId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
});

module.exports = mongoose.model('Segment', SegmentSchema);
