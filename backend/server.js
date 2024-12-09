const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // ใช้งาน cors

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const admin = require("./middlewares/admin");

// Server's API endpoints
app.use("/rfid", require("./apis/rfid_api")); //เรียก ค่า rfid จาก nodered
app.use("/menus", require("./apis/menu_api"));
app.use("/staffs", admin, require("./apis/staff_api"));
app.use("/order", require("./apis/order_api"));
app.use("/receipts", require("./apis/receipt_api"));
app.use("/check", require("./apis/check_api"));
app.use("/buzzer",require("./apis/buzzer_api"));


// Server runs on port 8085
app.listen(8085, () => {
    console.log("Backend is running...");
});
