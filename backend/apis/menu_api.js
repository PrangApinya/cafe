const express = require("express");
const router = express.Router();
const { Menu } = require("../models/associations");

// Retreive hot menus
router.get("/hot", async (req, res) => {
    try {
        const menus = await Menu.findAll({
            attributes: ["id", "name", "price", "filename"],
            where: {
                type: "HOT"
            }
        });

        return res.status(200).json(menus);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong"});
    }
});

// Retreive iced menus
router.get("/ice", async (req, res) => {
    try {
        const menus = await Menu.findAll({
            attributes: ["id", "name", "price", "filename"],
            where: {
                type: "ICED"
            }
        });

        return res.status(200).json(menus);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong"});
    }
});

// Retreive cake menus
router.get("/cake", async (req, res) => {
    try {
        const menus = await Menu.findAll({
            attributes: ["id", "name", "price", "filename"],
            where: {
                type: "CAKE"
            }
        });

        return res.status(200).json(menus);
    } catch(err) {
        console.error(err);
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
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;