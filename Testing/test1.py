import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BOARD)
pin=3
GPIO.setup(pin,GPIO.OUT,initial=0)
try:
    while(True):
        GPIO.output(pin,GPIO.HIGH)
        print("On")
        time.sleep(1)
        GPIO.output(pin,GPIO.LOW)
        print("Off")
        time.sleep(1)
except:
    GPIO.cleanup()
    print("Exiting...")
