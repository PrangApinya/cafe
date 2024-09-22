const fs = require("fs");
const path = require("path");
const express = require("express");
const easyinvoice = require("easyinvoice");
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

        await ReceiptMenu.bulkCreate(menus.map(menu => {
            return {
                receipt_id: receipt.dataValues.id,
                menu_id: menu.menu_id,
                quantity: menu.quantity,
                price: menu.price
            }
        }));
        
        const imgPath = path.resolve("receipts", "logo.png");

        const invoiceData = {
            apiKey: "free",
            mode: "development",
            images: {
                logo: fs.readFileSync(imgPath, "base64")
            },
            sender: {
                company: "CafeBucks",
            },
            information: {
                number: receipt.dataValues.id,
                date: receipt.dataValues.timestamp.toISOString().split("T")[0]
            },
            products: menus.map(menu => {
                return {
                    description: menu.name,
                    quantity: menu.quantity,
                    price: menu.price
                }
            }),
            bottomNotice: "THANK YOU",
            settings: {
                currency: "THB",
                locale: "th-TH",
                format: "A4",
                height: "1000px",
                width: "500px",
                orientation: "portrait"
            },
        };

        const result = await easyinvoice.createInvoice(invoiceData);
        fs.writeFileSync(path.resolve("receipts", `receipt-${receipt.dataValues.id}.pdf`), result.pdf, "base64");

        return res.status(201).json({ message: "The order is successful"});
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
})

module.exports = router