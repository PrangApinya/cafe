// นำเข้า sequelize จาก db_instance.js
const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

// Define a model for table "receipts"
const Receipt = sequelize.define("receipt", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, 
    },
    timestamp: {
        type: Sequelize.DATE,
        defaultValue: new Date().getTime(),
        allowNull: false,
    },
    total_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    }
}, {
    // Additional options if needed
    timestamps: false // ปิดการใช้งานฟิลด์ createdAt และ updatedAt
});

(async () => {
    await Receipt.sync({ force: false });
})();

module.exports = Receipt;
