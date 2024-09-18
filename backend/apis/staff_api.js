const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Staff = require("../models/staff_model");
const Check = require("../models/check_model");

// Add new staff to the system
router.post("/register", async (req, res) => {
    try {
        const { rfid,firstname , lastname, password } = req.body;

        const sanitizedRfid = rfid.trim();
        const sanitizedFirstname = firstname.trim();
        const sanitizedLastname = lastname.trim();
        const sanitizedPassword = password.trim();

        if (sanitizedRfid === "" || sanitizedFirstname === "" || sanitizedLastname === "" || sanitizedPassword === "") {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if(sanitizedRfid.length != 8) {
            return res.status(400).json({ message: "RFID must be 8 characters long" });
        }

        if(sanitizedPassword.length < 8 || sanitizedPassword.length > 16) {
            return res.status(400).json({ message: "Password must between 8 to 16 characters long" });
        }

        if(sanitizedFirstname.length < 2 || sanitizedFirstname.length > 20 || sanitizedLastname.length < 2 || sanitizedLastname.length > 20) {
            return res.status(400).json({ message: "First name and last name must be between 2 to 20 characters long" });
        }

        const hashedPassword = bcrypt.hash(sanitizedPassword, 10);
        
        const staff = await Staff.create(
            {
                rfid:sanitizedRfid,
                firstname: sanitizedFirstname,
                lastname: sanitizedLastname,
                password: hashedPassword,
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
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Check for staffs at the current day
router.get("/today", async (req, res) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const checks = await Check.findAll({
            where: {
                date: date
            }
        });

        return res.status(204).json(checks);
    } catch(err) {
        console.err(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Update staff information
router.put("/", async (req, res) => {
    try {
        const { firstname, lastname, password } = req.body;

        const sanitizedFirstname = firstname.trim();
        const sanitizedLastname = lastname.trim();
        const sanitizedPassword = password.trim();

        if (sanitizedFirstname === "" || sanitizedLastname === "" || sanitizedPassword === "") {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if(sanitizedPassword.length < 8 || sanitizedPassword.length > 16) {
            return res.status(400).json({ message: "Password must between 8 to 16 characters long" });
        }

        if(sanitizedFirstname.length < 2 || sanitizedFirstname.length > 20 || sanitizedLastname.length < 2 || sanitizedLastname.length > 20) {
            return res.status(400).json({ message: "First name and last name must be between 2 to 20 characters long" });
        }

        const hashedPassword = bcrypt.hash(sanitizedPassword, 10);

        await Staff.update(
            {
                firstname: sanitizedFirstname,
                lastname: sanitizedLastname,
                password: hashedPassword
            },
            {
                where: {
                    id: id
                }
            }
        );

        return res.status(204).json({ message: "Staff information updated" });
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Retrieve all staffs
router.get("/", async (req, res) => {
    try {
        const staffs = await Staff.findAll();
        return res.status(200).json(staffs);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;