const orderModel = require("../models/order.model");
const { sendToKafka } = require("../utils/producer");




const addOrderData = async (req, res) => {
    let { customer_id, order_date, order_amount } = req.body;
    if (!customer_id || !order_amount) {
        return res.status(400).send({ msg: "Invalid order data" });
    }
    if (!order_date)
        order_date = new Date();
    const orderData = { customer_id, order_date, order_amount };
    sendToKafka('add-order', orderData);
    return res.status(200).send({ msg: "Order data added successfully" });
};

const setOrderDataInDatabase = async (data) => {
    try {
        let { customer_id, order_amount, order_date } = JSON.parse(data);
        if (!customer_id || !order_amount) {
            console.log("Invalid order data");
            return;
        }
        if (!order_date)
            order_date = new Date();
        const newOrder = new orderModel({ customer_id, order_date, order_amount });
        await newOrder.save();
        console.log("Order data saved successfully");
    } catch (error) {
        console.log("Error in parsing data", error);
        return;
    }
};

module.exports = { addOrderData, setOrderDataInDatabase };
