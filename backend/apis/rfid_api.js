const express = require("express");
const router = express.Router();
const { Staff } = require("../models/associations");

// Check if RFID exists in the database
router.post("/check-rfid", async (req, res) => {
    try {
        const { rfid } = req.body;

        const sanitizedRfid = rfid.trim();

        if (sanitizedRfid === "") {
            return res.status(400).json({ message: "RFID is required" });
        }

        if (sanitizedRfid.length !== 8) {
            return res.status(400).json({ message: "RFID must be 8 characters long" });
        }

        const staff = await Staff.findOne({ where: { rfid } });

        if (staff) {
            return res.status(200).json({ message: "Staff exists", exists: true });
        } else {
            return res.status(400).json({ message: "Staff doesn't exist", exists: false });
        }
    } catch (error) {
        console.error("Error checking RFID:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;
