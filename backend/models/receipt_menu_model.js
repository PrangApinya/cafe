// นำเข้า sequelize จาก db_instance.js
const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Receipt = require("./receipt_model");
const Menu = require("./menu_model");

// Define a model for table "receipt_menus"
const ReceiptMenu = sequelize.define("receipt_menu", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    receipt_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Receipt,
            key: "id",
        }
    },
    menu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Menu,
            key: "id",
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
}, {
    // Additional options if needed
    
    timestamps: false // ปิดการใช้งานฟิลด์ createdAt และ updatedAt
});

(async () => {
    await ReceiptMenu.sync({ force: false });
})();

module.exports = ReceiptMenu;
