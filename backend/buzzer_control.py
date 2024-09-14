# buzzer_control.py ใช้งานผ่าน server.js /api/buzzer
import RPi.GPIO as GPIO
import sys
import time  


GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.OUT)  


if len(sys.argv) > 1:
    if sys.argv[1] == 'on':
        GPIO.output(18, GPIO.HIGH)  
        time.sleep(0.5) 
        GPIO.output(18, GPIO.LOW)  
    elif sys.argv[1] == 'off':
        GPIO.output(18, GPIO.LOW)  


GPIO.cleanup()