const express = require('express');
const { Op, fn, col } = require('sequelize');
const { Receipt, Menu, ReceiptMenu } = require("../models/associations");
const router = express.Router();

// 6menu (best seller)
router.get('/top-menu-sales', async (req, res) => {
    try {
        const topMenus = await ReceiptMenu.findAll({
            attributes: [
                'menu_id',
                [fn('SUM', col('quantity')), 'total_quantity'],
                [fn('SUM', col('total_price')), 'total_price']
            ],
            group: ['menu_id'],
            limit: 6,
            include: [{
                model: Menu,
                attributes: ['name', 'type'] // Ensure we are fetching both name and type
            }],
            order: [[fn('SUM', col('total_price')), 'DESC']] // Sort by sales
        });
        res.json(topMenus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
});

// 2. ดึงข้อมูลเมนูทั้งหมดรายวัน
router.get('/daily-sales', async (req, res) => {
    try {
        const currentDay = new Date();
        currentDay.setHours(0, 0, 0, 0);
        const timestamp = currentDay.getTime();
        
        const dailySales = await ReceiptMenu.findAll({
            attributes: [
                'menu_id',
                [fn('SUM', col('quantity')), 'total_quantity'],
                [fn('SUM', col('total_price')), 'total_price'],
            ],
            group: ['menu_id'],
            include: [
                {
                    model: Menu,
                    attributes: ['name','type'],
                },
            ],
            order: [[fn('SUM', col('total_price')), 'DESC']]

        });
        
        res.json(dailySales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
});

// 3. ดึงข้อมูลเมนูทั้งหมดรายเดือน
/*
router.get('/monthly-sales', async (req, res) => {
    try {
        const monthlySales = await ReceiptMenu.findAll({
            attributes: [
                'menu_id',
                [fn('SUM', col('quantity')), 'total_quantity'],
                [fn('SUM', col('total_price')), 'total_price'],
                [fn('DATE_TRUNC', 'month', col('createdAt')), 'sale_month'] // ใช้สร้างข้อมูลเดือน
            ],
            group: ['menu_id', fn('DATE_TRUNC', 'month', col('createdAt'))],
            include: [{
                model: Menu,
                attributes: ['name']
            }]
        });
        res.json(monthlySales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
});
*/
module.exports = router;
