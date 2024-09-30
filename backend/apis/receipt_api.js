const express = require("express");
const router = express.Router();
const { Receipt, Menu, ReceiptMenu } = require("../models/associations");
const { Sequelize, Op } = require("sequelize");
const sqlite = require("sqlite3");
const db = new sqlite.Database("./database.db");

// Retrieve 6 most popular menus
router.get("/best-seller", async (req, res) => {
    try {
        const bestSeller = await ReceiptMenu.findAll({
            attributes: [
                "menu_id",
                [Sequelize.fn("sum", Sequelize.col("quantity")), "total_quantity"]
            ],
            group: ["menu_id"],
            order: [[Sequelize.fn("sum", Sequelize.col("quantity")), "DESC"]],
            limit: 6,
            include: {
                model: Menu,
                attributes: ["name", "type"],
                required: true
            }
        });

        // const bestSeller = db.all(
        //     `SELECT receipt_menus.menu_id, menus.name, SUM(receipt_menus.quantity) AS total_quantity
        //     FROM receipt_menus INNER JOIN menus ON receipt_menus.menu_id = menus.id 
        //     GROUP BY receipt_menus.menu_id ORDER BY total_quantity DESC LIMIT 6`, (err, rows) => {
        //     if (err) {
        //         return err;
        //     }
        //     return rows;
        // });

        return res.status(200).json(bestSeller);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Retrieve total sales in the current day along with quantities sold
router.get("/sales-today", async (req, res) => {
    try {
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);
        const timestamp = currentDay.getTime();

        // Retrieve total sales
        const salesToday = await Receipt.findOne({
            attributes: [
                [Sequelize.fn("count", Sequelize.col("id")), "total_sales"],
                [Sequelize.fn("sum", Sequelize.col("total_price")), "total_price"]
            ],
            where: {
                timestamp: {
                    [Op.gte]: timestamp,
                    [Op.lt]: timestamp + 86400000,
                }
            }
        });

        // Retrieve quantities sold for each menu
        const quantitiesToday = await ReceiptMenu.findAll({
            attributes: [
                "menu_id",
                [Sequelize.fn("sum", Sequelize.col("quantity")), "total_quantity"],
            ],
            include: {
                model: Menu,
                attributes: ["name"],
                required: true,
            },
            where: {
                '$Receipt.timestamp$': {
                    [Op.gte]: timestamp,
                    [Op.lt]: timestamp + 86400000,
                },
            },
            include: [
                {
                    model: Receipt,
                    attributes: [],
                },
                {
                    model: Menu,
                    attributes: ["name"],
                },
            ],
            group: ["menu_id"],
            order: [[Sequelize.fn("sum", Sequelize.col("quantity")), "DESC"]],
        });

        return res.status(200).json({ salesToday, quantitiesToday });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Retrieve total sales in the current month along with quantities sold
router.get("/sales-this-month", async (req, res) => {
    try {
        const currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setHours(0, 0, 0, 0);
        const timestamp = currentMonth.getTime();

        // Retrieve total sales
        const salesThisMonth = await Receipt.findOne({
            attributes: [
                [Sequelize.fn("count", Sequelize.col("id")), "total_sales"],
                [Sequelize.fn("sum", Sequelize.col("total_price")), "total_price"]
            ],
            where: {
                timestamp: {
                    [Op.gte]: timestamp,
                    [Op.lt]: timestamp + 2678400000, // จำนวน ms ของเดือนที่สั้นที่สุด (31 วัน)
                }
            }
        });

        // Retrieve quantities sold for each menu
        const quantitiesThisMonth = await ReceiptMenu.findAll({
            attributes: [
                "menu_id",
                [Sequelize.fn("sum", Sequelize.col("quantity")), "total_quantity"],
            ],
            include: {
                model: Menu,
                attributes: ["name"],
                required: true,
            },
            where: {
                '$Receipt.timestamp$': {
                    [Op.gte]: timestamp,
                    [Op.lt]: timestamp + 2678400000,
                },
            },
            include: [
                {
                    model: Receipt,
                    attributes: [],
                },
                {
                    model: Menu,
                    attributes: ["name"],
                },
            ],
            group: ["menu_id"],
            order: [[Sequelize.fn("sum", Sequelize.col("quantity")), "DESC"]],
        });

        return res.status(200).json({ salesThisMonth, quantitiesThisMonth });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router