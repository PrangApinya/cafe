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
    menu_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "menu",
            key: "id",
        }
    },
    sweet_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    topping: {
        type: Sequelize.STRING,
        allowNull: true,
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
