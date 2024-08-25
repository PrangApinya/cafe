const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt_model");

// Order from cart
router.post("/", async (req, res) => {
    try {
        const { menuId, sweetLevel, topping } = req.body;
        const timestamp = new Date().getTime();

        const receipt = await Receipt.create(
            {
                menu_id: menuId,
                sweet_level: sweetLevel,
                topping: topping,
                timestamp: timestamp
            }
        );
        receipt.save();

        res.status(201).json({ message: "The order is successful"});
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})

module.exports = router