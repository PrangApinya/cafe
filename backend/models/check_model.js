// นำเข้า sequelize จาก db_instance.js
const Sequelize = require("sequelize");
const sequelize = require("../db_instance");
const Staff = require("./staff_model");

const Check = sequelize.define("check", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    staff_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: Staff,
            key: "rfid",
        }
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date().toISOString().split('T')[0],
        allowNull: false,
    },
    datetime: {
        type: Sequelize.DATE,
        defaultValue: new Date().toISOString(),
        allowNull: false,
    },
}, {
    // Additional options if needed
    timestamps: false // ปิดการใช้งานฟิลด์ createdAt และ updatedAt
});

(async () => {
    await Check.sync({ force: false });
})();


module.exports = Check;
