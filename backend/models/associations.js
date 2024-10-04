const Check = require("./check_model.js");
const Menu = require("./menu_model.js");
const Receipt = require("./receipt_model.js");
const ReceiptMenu = require("./receipt_menu_model.js");
const Staff = require("./staff_model.js");

// Define associations between models
Check.belongsTo(Staff, {
    foreignKey: "staff_id",
    sourceKey: "rfid",
    onDelete: "CASCADE",
});
Staff.hasMany(Check, {
    foreignKey: "staff_id",
    sourceKey: "rfid",
    onDelete: "CASCADE",
});
ReceiptMenu.belongsTo(Menu, {
    foreignKey: "menu_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});
ReceiptMenu.belongsTo(Receipt, {
    foreignKey: "receipt_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});
Menu.hasMany(ReceiptMenu, {
    foreignKey: "menu_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});
Receipt.hasMany(ReceiptMenu, {
    foreignKey: "receipt_id",
    sourceKey: "id",
    onDelete: "CASCADE",
});

(async () => {
    await Menu.sync({ force: false });
})();

module.exports = { Check, Menu, Receipt, ReceiptMenu, Staff };
