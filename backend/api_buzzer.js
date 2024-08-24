const express = require("express");
const router = express.Router()
const Gpio = require('onoff').Gpio; // เรียกใช้ไลบรารี onoff

router.post('/buzz', (req, res) => {
    // เปิด buzzer
    buzzer.writeSync(1); 
    
    // ปิด buzzer หลังจาก 1 วินาที (1000 มิลลิวินาที)
    setTimeout(() => {
      buzzer.writeSync(0); 
    }, 1000);
  
    res.send('Buzzer activated');
  });




module.exports = router;