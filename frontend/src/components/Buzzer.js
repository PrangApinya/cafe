import React from 'react'

const Buzzer = () => {
    const activateBuzzer = async () => {
      try {
        const response = await fetch('/buzz', {
          method: 'POST'
        });
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error('Error activating buzzer:', error);
      }
    };
  
    return (
      <div>
        <h1>Buzzer Control</h1>
        <button onClick={activateBuzzer}>Activate Buzzer</button>
      </div>
    );
  };

export default Buzzer