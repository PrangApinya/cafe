const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt_model");

// Retrieve all receipts in the current day
router.get("/", async (req, res) => {
    try {
        const currentDay = new Date().setHours(0, 0, 0, 0).getTime();

        const receipts = await Receipt.findAll({
            where: {
                timestamp: {
                    [Op.gte]: currentDay,
                    [Op.lt]: currentDay + 86400000,
                }
            }
        });

        return res.status(201).json(receipts);
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router