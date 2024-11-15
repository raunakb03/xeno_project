const userModel = require("../models/user.model");
const { sendToKafka } = require("../utils/producer");


function validateUserEamil(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const addCustomerData = async (req, res) => {
    let { name, email, phone, total_spend, visit_count, last_visit } = req.body;
    if (!name || !email || !phone || !total_spend || !visit_count || !validateUserEamil(email)) {
        return res.status(400).send({ msg: "Invalid customer data" });
    }
    if (!last_visit) {
        last_visit = new Date();
    }
    const customerData = { name, email, phone, total_spend, visit_count, last_visit };
    sendToKafka('add-user', customerData);
    return res.status(200).send({ msg: "Customer data added successfully" });
};

const setCustomerDataInDatabase = async (data) => {
    const { name, email, phone, total_spend, visit_count, last_visit } = JSON.parse(data);
    const user = await userModel.findOne({ email: email });
    if (user) {
        if (total_spend)
            user.total_spend += Number(total_spend);
        if (visit_count)
            user.visit_count += Number(visit_count);
        user.last_visit = new Date();
        await user.save();
        console.log("User data updated successfully");
        return;
    }
    const newUser = new userModel({ name, email, phone, total_spend, visit_count, last_visit });
    await newUser.save();
    console.log("User data saved successfully");
    try {

    } catch (error) {
        console.log("Error in parsing data", error);
        return;
    }
};

module.exports = { addCustomerData, setCustomerDataInDatabase };
