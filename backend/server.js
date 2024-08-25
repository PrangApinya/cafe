const express = require("express");
const cors = require("cors"); // นำเข้า cors

const app = express();

app.use(cors()); // ใช้งาน cors

// ของ postman เอาไว้เทส api
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const admin = require("./middlewares/admin");

// เอาไว้เรียก api ย่อย จะเพิ่ม api เพิ่มตรงนี้
app.use("/api/v1/rfid/", require("./api_rfid")); //เรียก ค่า rfid จาก nodered
app.use("/menu", require("./apis/menu_api"));
app.use("/staffs", admin, require("./apis/staff_api"));
app.use("/order", require("./apis/order_api"));
app.use("/receipts", require("./apis/receipt_api"));
app.use("/api/v1/sss/", require("./api_sss"));
app.use("/api/v1/buzzer/", require("./api_buzzer"));
// run node
app.listen(8085, () => {
    console.log("Backend is running...");
});
