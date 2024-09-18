// นำเข้า sequelize จาก db_instance.js
const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

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
}, {
    // Additional options if needed
    timestamps: false // ปิดการใช้งานฟิลด์ createdAt และ updatedAt
});

(async () => {
    await Receipt.sync({ force: false });
})();

module.exports = Receipt;
