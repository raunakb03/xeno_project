const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/db_connect");
require('./utils/consumer');
const { addCustomerData, getAllUsers, getFilteredUsers } = require("./controllers/customer.controller");
const { addOrderData } = require("./controllers/order.controller");
const { createSegment, getAllSegments } = require("./controllers/segement.controller");
const { createCampaign, getAllCampaigns } = require("./controllers/campaign.controller");
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.post('/add-customer', addCustomerData);
app.get('/get-all-users', getAllUsers);
app.post('/add-order', addOrderData);
app.post('/get-filtered-users', getFilteredUsers);
app.post('/create-segment', createSegment);
app.get('/get-all-segment', getAllSegments);
app.post('/create-campaign', createCampaign);
app.get('/get-all-campaigns', getAllCampaigns);


app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000");
    connectDB();
});
