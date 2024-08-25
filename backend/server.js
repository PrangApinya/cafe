const express = require("express");
const cors = require("cors"); // นำเข้า cors

const app = express();

app.use(cors()); // ใช้งาน cors

// ของ postman เอาไว้เทส api
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// เอาไว้เรียก api ย่อย จะเพิ่ม api เพิ่มตรงนี้
app.use("/api/v1/rfid/", require("./api_rfid")); //เรียก ค่า rfid จาก nodered
app.use("/api/v1/employee/", require("./api_employee"));


// run node
app.listen(8085, () => {
    console.log("Backend is running...");
});
