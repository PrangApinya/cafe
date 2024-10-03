const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

// API to trigger buzzer after an order using Python script
router.get('/buzzer', (req, res) => {
  exec('python3 /home/watchaphon/cafe/backend/buzzer_control.py on', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error triggering buzzer');
    }
    console.log(`Buzzer Output: ${stdout}`);
    res.send('Buzzer triggered successfully');
  });
});

module.exports = router;

/*
app.get('/api/buzzer', (req, res) => {
    exec('python3 /home/watchaphon/cafe/backend/buzzer_control.py on', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send('Error triggering buzzer');
      }
      res.send('Buzzer triggered successfully');
    });
  });
*/
