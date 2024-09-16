const express = require("express");
const cors = require("cors"); // นำเข้า cors
const { exec } = require('child_process');
const app = express();

app.use(cors()); // ใช้งาน cors

// ของ postman เอาไว้เทส api
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//const admin = require("./middlewares/admin");

// เอาไว้เรียก api ย่อย จะเพิ่ม api เพิ่มตรงนี้
app.use("/rfid", require("./apis/rfid_api")); //เรียก ค่า rfid จาก nodered
app.use("/menu", require("./apis/menu_api"));
app.use("/staffs", /*admin,*/ require("./apis/staff_api"));
app.use("/order", require("./apis/order_api"));
app.use("/receipts", require("./apis/receipt_api"));

app.get('/api/buzzer', (req, res) => {
    exec('python3 /home/watchaphon/cafe/backend/buzzer_control.py on', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send('Error triggering buzzer');
      }
      res.send('Buzzer triggered successfully');
    });
  });

// run node
app.listen(8085, () => {
    console.log("Backend is running...");
});
