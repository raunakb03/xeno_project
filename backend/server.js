const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./utils/db_connect");
require('./utils/consumer');
const { addCustomerData } = require("./controllers/customer.controller");
const { addOrderData } = require("./controllers/order.controller");
const app = express();

dotenv.config();

app.use(express.json());

app.post('/add-customer', addCustomerData);
app.post('/add-order', addOrderData);


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000");
    connectDB();
});
