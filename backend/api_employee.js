const express = require("express");
const router = express.Router();
const employee = require("./models/employee")

router.get("/login", (req, res) => {
    res.json({ result: "login" });
});

router.post("/register", (req, res) => {
    const { rfid , firstName , lastName, password } = req.body
    employee.create(req.body)
    res.json({ result: "register", rfid, firstName, lastName, password });
});

module.exports = router;
