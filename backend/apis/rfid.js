const express = require("express");
const router = express.Router();
const Staff = require("../models/staff_model");
router.post("/", (req, res) => {
    const rfidData = req.body.rfidData;
    const timestamp = new Date();

    console.log("Received RFID Data: ", rfidData, "at", timestamp);

    res.json({ success: true, message: "RFID data received successfully", data: { rfid: rfidData, timestamp } });
});

router.post("/check-rfid", async (req, res) => {
    const { rfid } = req.body;
    const staff = await Staff.findOne({ where: { rfid } });
    

    if (staff) {
        return res.status(200).json({ exists: true });
    } else {
        return res.status(200).json({ exists: false });
    }
});




module.exports = router;