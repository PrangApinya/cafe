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
                attributes: ['name', 'type'], // Ensure we are fetching both name and type
                required: true
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
                [fn('SUM', col('receipt_menu.total_price')), 'total_price'],
            ],
            group: ['menu_id'],
            include: [
                {
                    model: Menu,
                    attributes: ['name','type'],
                    required: true
                },
                {
                    model: Receipt,
                    attributes: [],
                    where: {
                        timestamp: {
                            [Op.gte]: timestamp,
                            [Op.lt]: timestamp + 86400000
                        }
                    },
                    required: true
                }
            ],
            order: [[fn('SUM', col('receipt_menu.total_price')), 'DESC']]
        });
        
        res.json(dailySales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
});

// 3. ดึงข้อมูลเมนูทั้งหมดรายเดือน
router.get('/monthly-sales', async (req, res) => {
    try {
        const currentMonth = new Date();
        currentMonth.setDate(1);
        currentMonth.setHours(0, 0, 0, 0);
        const timestamp = currentMonth.getTime();

        const monthlySales = await ReceiptMenu.findAll({
            attributes: [
                'menu_id',
                [fn('SUM', col('quantity')), 'total_quantity'],
                [fn('SUM', col('receipt_menu.total_price')), 'total_price'],
            ],
            group: ['menu_id'],
            include: [
                {
                    model: Menu,
                    attributes: ['name', 'type']
                },
                {
                    model: Receipt,
                    attributes: [],
                    where: {
                        timestamp: {
                            [Op.gte]: timestamp,
                            [Op.lt]: timestamp + 2678400000
                        }
                    },
                    required: true
                }
            ],
            order: [[fn('SUM', col('receipt_menu.total_price')), 'DESC']]
        });
        res.json(monthlySales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการดึงข้อมูล' });
    }
});

module.exports = router;
