const campaignModel = require("../models/campaign.model");
const segmentModel = require("../models/segment.model");
const userModel = require("../models/user.model");
const { sendToKafka } = require("../utils/producer");

const createCampaign = async (req, res) => {
    try {
        const { clerkId, name, segmentId, message } = req.body;
        const segment = await segmentModel.findById(segmentId);

        const users = [];
        await Promise.all(segment.userId.map(async (userId) => {
            const user = await userModel.findById(userId);
            users.push(user);
        }));
        const messages = [];
        users.forEach((user) => {
            let newMessage = message;
            Object.keys(user._doc).forEach((key) => {
                newMessage = newMessage.replace(`[${key.toLowerCase()}]`, user[key.toLowerCase()]);
                let newKey = key[0].toUpperCase() + key.slice(1);
                newMessage = newMessage.replace(`[${newKey}]`, user[key.toLowerCase()]);
            });
            messages.push(newMessage);
        });

        const success = [];
        //users.forEach((user) => {
        //    if (Math.random() < 0.9) { 
        //        success.push(user._id); 
        //    } 
        //}); 
        let campaign=new campaignModel({ clerkId, name, segmentId, message, success }); 
        await campaign.save(); 
        sendToKafka("create-report", campaign._id);
        campaign.segmentId = segment;
        res.status(201).send(campaign); 
    } catch (err) { 
        console.log(err);
        res.status(400).json(err);
    }
}; 
const getAllCampaigns=async (req, res)=> {
    try {
        const campaigns = await campaignModel.find({clerkId: req.query.userId}).sort({createdAt: -1}).populate('segmentId');
        res.status(200).send(campaigns);
    } catch (err) { res.status(400).json(err); }
};

const updateDeliveryReport = async (campaignId) => {
    try{
        campaignId = JSON.parse(campaignId);
        const campaign = await campaignModel.findById(campaignId);
        const segmentId = campaign.segmentId;
        const segment = await segmentModel.findById(segmentId);
        const users = [];
        await Promise.all(segment.userId.map(async (userId) => {
            const user = await userModel.findById(userId);
            users.push(user);
        }));
        let success = [];
        users.forEach((user) => {
            if (Math.random() < 0.9) { success.push(user._id); }
        });
        campaign.success = success;
        await campaign.save();
        console.log("REPORT UPDATED");
    } catch (err) { console.log(err); }
};


module.exports = { createCampaign, getAllCampaigns, updateDeliveryReport };
