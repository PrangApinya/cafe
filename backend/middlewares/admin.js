const Staff = require("../models/staff_model");

async function admin(req, res, next) {
    const id = req.body.id;
    console.log(id)
    const staff = await Staff.findOne({
        attributes: ["is_admin"],
        where: {
            id: id
        }
    });

    if(staff.dataValues.is_admin !== true) {
        return res.status(403).json({ message: "Unauthorized"})
    } else {
        next();
    }
}

module.exports = admin;