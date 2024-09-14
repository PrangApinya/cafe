const express = require("express");
const router = express.Router();
const { exec } = require('child_process');

router.get("/on",async(req, res) =>{
    exec('python3 /home/watchaphon/cafe/backend/buzzer_control.py on', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).send('Error triggering buzzer');
        }
        res.send('Buzzer triggered successfully');
      });
})

