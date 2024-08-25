const { exec } = require('child_process');

// ฟังก์ชันเปิด Buzzer
const turnBuzzerOn = (req, res) => {
  exec('python3 /path/to/buzzer_control.py on', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error turning on buzzer: ${error}`);
      return res.status(500).send('Error turning on buzzer');
    }
    res.send('Buzzer turned on');
  });
};

// ฟังก์ชันปิด Buzzer
const turnBuzzerOff = (req, res) => {
  exec('python3 /path/to/buzzer_control.py off', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error turning off buzzer: ${error}`);
      return res.status(500).send('Error turning off buzzer');
    }
    res.send('Buzzer turned off');
  });
};

module.exports = {
  turnBuzzerOn,
  turnBuzzerOff
};
