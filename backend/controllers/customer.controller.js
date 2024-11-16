const { json } = require("express");
const userModel = require("../models/user.model");
const { sendToKafka } = require("../utils/producer");
const { getFormattedDate } = require("../utils/utils");


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
        last_visit = getFormattedDate(new Date());
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
        user.last_visit = getFormattedDate(new Date());
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

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ msg: "Error in getting users" });
    }
};


const buildQuery = (filters) => {
    const operatorMap = {
        gt: "$gt",
        lt: "$lt",
        gte: "$gte",
        lte: "$lte",
        eq: "$eq",
        neq: "$ne",
    };

    let currentGroup = [];
    const orGroups = [];

    filters.forEach((filter) => {
        let value;
        if (filter.field.toLowerCase().includes("last_visit")) {
            value = new Date(filter.value); 
        } else {
            value = parseFloat(filter.value);
        }
        const condition = {
            [filter.field]: { [operatorMap[filter.operator]]: value },
        };
        if (filter.logic === "or") {
            if (currentGroup.length) {
                orGroups.push({ $and: currentGroup });
                currentGroup = [];
            }
            orGroups.push(condition);
        } else {
            currentGroup.push(condition);
        }
    });
    if (currentGroup.length) {
        orGroups.push({ $and: currentGroup });
    }
    return orGroups.length > 1 ? { $or: orGroups } : orGroups[0];
};

const getFilteredUsers = async (req, res) => {
    const { filterData } = req.body;
    console.log(filterData);
    const query = buildQuery(filterData);
    console.log("this is query ", JSON.stringify(query));
    try {
        const users = await userModel.find(query);
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({ msg: "Error in getting users" });
    }
};

module.exports = { addCustomerData, setCustomerDataInDatabase, getAllUsers, getFilteredUsers };
