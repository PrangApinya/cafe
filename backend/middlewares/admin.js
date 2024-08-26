const Staff = require("../models/staff_model");

async function admin(req, res, next) {
    const id = req.body.id;

    const staff = await Staff.findAll({
        attributes: ["is_admin"],
        where: {
            rfid: id
        }
    })
    console.log(staff);

    if(staff[0].dataValues.is_admin !== true) {
        return res.status(403).json({ message: "Unauthorized"})
    } else {
        next();
    }
}

module.exports = admin;