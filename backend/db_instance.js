const Sequelize = require("sequelize")
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db"
});
(async () =>{
    await sequelize.authenticate();
})();

module.exports = sequelize