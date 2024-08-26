const express = require("express");
const router = express.Router();
const Staff = require("../models/staff_model");
const Check = require("../models/check_model");

// Add new staff to the system
router.post("/register", async (req, res) => {
    try {
        const { rfid,firstname , lastname, password } = req.body;
        
        const staff = await Staff.create(
            {
                rfid:rfid,
                firstname: firstname,
                lastname: lastname,
                password: password,
            }
        );
        staff.save();

        return res.status(201).json({ message: "Staff added to the system" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Delete staff from the system
router.delete("/", async (req, res) => {
    try {
        const id = req.body.staffId;
        
        await Staff.destroy({
            where: {
                id: id
            }
        });

        return res.status(204).json({ message: "Staff deleted from the system" });
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})

// Check for staffs at the current day
router.get("/", async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const checks = await Check.findAll({
            where: {
                date: date
            }
        });

        return res.status(204).json(checks);
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})

module.exports = router;