require("dotenv").config();
const jwt = require("jsonwebtoken");
const Staff = require("../models/staff_model");

// Middleware to authorize admin access
async function admin(req, res, next) {
    const token = req.headers["x-access-token"];
    try {
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Invalid token" });
            }

            return decoded;
        });

        const staff = await Staff.findOne({
            attributes: ["is_admin"],
            where: {
                rfid: decoded.staff
            }
        });
    
        if(staff.dataValues.is_admin !== true) {
            return res.status(401).json({ message: "Admin role required" });
        } else {
            next();
        }
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = admin;