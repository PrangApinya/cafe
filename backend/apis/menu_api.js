const express = require("express");
const router = express.Router();
const Menu = require("../models/menu_model");

// Retrieve all menus from the database
router.get("/", async (req, res) => {
    try {
        const menus = await Menu.findAll();

        return res.status(200).json(menus);
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong"});
    }
});

router.get("/hot", async (req, res) => {
    try {
        const menus = await Menu.findAll({
            attributes: ["id", "name", "price"],
            where: {
                type: "HOT"
            }
        });

        return res.status(200).json(menus);
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong"});
    }
});

router.get("/ice", async (req, res) => {
    try {
        const menus = await Menu.findAll({
            attributes: ["id", "name", "price"],
            where: {
                type: "ICED"
            }
        });

        return res.status(200).json(menus);
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong"});
    }
});

router.get("/cake", async (req, res) => {
    try {
        const menus = await Menu.findAll({
            attributes: ["id", "name", "price"],
            where: {
                type: "CAKE"
            }
        });

        return res.status(200).json(menus);
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong"});
    }
});

// Retrieve menu specified by id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const menu = await Menu.findOne({
            where: {
                id: id
            }
        });

        return res.status(200).json(menu);
    } catch(err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;