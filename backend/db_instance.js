const Sequelize = require("sequelize")
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database_fix.db"
});
(async () =>{
    await sequelize.authenticate();
})();

module.exports = sequelize