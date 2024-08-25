// นำเข้า sequelize จาก db_instance.js
const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const employee = sequelize.define("employee", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    rfid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    level: {
        type: Sequelize.STRING,
        defaultValue: "normal",
    },
}, {
    
    timestamps: false 
});

(async () => {
    await employee.sync({ force: false });
})();

module.exports = employee;
