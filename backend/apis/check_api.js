const express = require("express");
const router = express.Router();
const Check = require("../models/check_model");
const Staff = require("../models/staff_model"); 

// Staff Checking
router.post("/check-in", async (req, res) => {
    try {
        const { rfid } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const datetime = new Date().toISOString();

        const check = await Check.create(
            {
                staff_id: rfid,
                date: date,
                datetime: datetime
            }
        );

        return res.status(201).json({ message: "Staff checked in" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});



module.exports = router;
