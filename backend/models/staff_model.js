// นำเข้า sequelize จาก db_instance.js
const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const Staff = sequelize.define("staff", {
    rfid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
    },
}, {
    timestamps: false 
});

(async () => {
    await Staff.sync({ force: false });
})();

module.exports = Staff;