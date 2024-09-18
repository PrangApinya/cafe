const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt_model");
const ReceiptMenu = require("../models/receipt_menu_model");

// Order from cart
router.post("/", async (req, res) => {
    try {
        const { menus } = req.body;
        const timestamp = new Date().getTime();

        const receipt = await Receipt.create(
            {
                timestamp: timestamp
            }
        );
        receipt.save();

        // for(let i = 0; i < menus.length; i++) {
        //     const receiptMenu = await ReceiptMenu.create(
        //         {
        //             receipt_id: receipt.dataValues.id,
        //             menu_id: menus[i].id,
        //             quantity: menus[i].quantity,
        //             price: menus[i].price
        //         }
        //     );
        //     receiptMenu.save();
        // }
        await ReceiptMenu.bulkCreate(menus.map(menu => {
            return {
                receipt_id: receipt.dataValues.id,
                menu_id: menu.menu_id,
                quantity: menu.quantity,
                price: menu.price
            }
        }));

        return res.status(201).json({ message: "The order is successful"});
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
})

module.exports = router