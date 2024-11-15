const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order_date: {
        type: Date,
        required: true,
    },
    order_amount: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);
