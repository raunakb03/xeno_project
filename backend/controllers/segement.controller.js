const segmentModel = require("../models/segment.model");

const createSegment = async (req, res) => {
    try {
        const { userId: userData } = req.body;
        const segment = new segmentModel(userData);
        await segment.save();
        res.status(201).send(segment);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};
const getAllSegments = async (req, res) => {
    try {
        const segments = await segmentModel.find();
        res.status(200).send(segments);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

module.exports = { createSegment, getAllSegments };
