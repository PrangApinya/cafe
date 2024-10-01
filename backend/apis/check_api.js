require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Check } = require("../models/associations");
const { Op } = require('sequelize');

// count staff for the current day
router.get("/staff-count", async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const count = await Check.count({
      distinct: true,
      col: 'staff_id', // คัดกรองเพื่อให้ไม่ซ้ำ
      where: {
        datetime: {
          [Op.between]: [startOfDay, endOfDay] // เงื่อนไขนับเฉพาะในวันปัจจุบัน
        }
      }
    });

    return res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


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
    check.save();

    const token = jwt.sign(
      { staff: rfid },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(201).json({ message: "Staff checked in", token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// Retrieve all attendance records for a specifc staff
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const checks = await Check.findAll({
      where: { staff_id: id }
    });

    return res.status(200).json(checks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to fetch attendance records' });
  }
});


// Retrieve all attendance records
router.get("/", async (req, res) => {
  try {
    const checks = await Check.findAll();

    return res.status(200).json(checks);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
})
module.exports = router;
