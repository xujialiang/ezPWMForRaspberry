const rpio = require('rpio');
const ezPWM = require('./index.js');

//左后轮向前
console.log('open 13 AIN1')
console.log('open 11 AIN2')
rpio.open(13, rpio.OUTPUT, rpio.HIGH); // AIN1 HIGH
rpio.open(11, rpio.OUTPUT, rpio.LOW);  // AIN2 LOW

//右后轮向前
console.log('open 15 AIN1')
console.log('open 16 AIN2')
rpio.open(15, rpio.OUTPUT, rpio.HIGH); // AIN1 HIGH
rpio.open(16, rpio.OUTPUT, rpio.LOW);  // AIN2 LOW

//右前轮向前
console.log('open 22 AIN1')
console.log('open 18 AIN2')
rpio.open(18, rpio.OUTPUT, rpio.HIGH); // AIN1 HIGH
rpio.open(22, rpio.OUTPUT, rpio.LOW);  // AIN2 LOW

//左前轮向前
console.log('open 29 AIN1')
console.log('open 31 AIN2')
rpio.open(31, rpio.OUTPUT, rpio.HIGH); // AIN1 HIGH
rpio.open(29, rpio.OUTPUT, rpio.LOW);  // AIN2 LOW


console.log('init ezPWM')
let pwm = new ezPWM();

console.log('openPWMByPercent')
pwm.openPWMByPercent(ezPWM.PWMPin.PIN12);


for (let index = 0; index < 100; index++) {
    rpio.sleep(0.1);
    console.log('updatePWMByPercent', ezPWM.PWMPin.PIN12 ,index);
    pwm.updatePWMByPercent(ezPWM.PWMPin.PIN12,index);
}


//左后轮向前
console.log('open 13 AIN1')
console.log('open 11 AIN2')
rpio.open(13, rpio.OUTPUT, rpio.LOW); // AIN1 HIGH
rpio.open(11, rpio.OUTPUT, rpio.HIGH);  // AIN2 LOW

//右后轮向前
console.log('open 15 AIN1')
console.log('open 16 AIN2')
rpio.open(15, rpio.OUTPUT, rpio.LOW); // AIN1 HIGH
rpio.open(16, rpio.OUTPUT, rpio.HIGH);  // AIN2 LOW

//右前轮向前
console.log('open 22 AIN1')
console.log('open 18 AIN2')
rpio.open(18, rpio.OUTPUT, rpio.LOW); // AIN1 HIGH
rpio.open(22, rpio.OUTPUT, rpio.HIGH);  // AIN2 LOW

//左前轮向前
console.log('open 29 AIN1')
console.log('open 31 AIN2')
rpio.open(31, rpio.OUTPUT, rpio.LOW); // AIN1 HIGH
rpio.open(29, rpio.OUTPUT, rpio.HIGH);  // AIN2 LOW

for (let index = 100; index > 0; index--) {
    rpio.sleep(0.1);
    console.log('updatePWMByPercent', ezPWM.PWMPin.PIN12 ,index);
    pwm.updatePWMByPercent(ezPWM.PWMPin.PIN12,index);
}


rpio.close(11);
rpio.close(13);
rpio.close(15);
rpio.close(16);
rpio.close(22);
rpio.close(18);
rpio.close(29);
rpio.close(31);

pwm.updatePWMByPercent(ezPWM.PWMPin.PIN12,0);
pwm.closePWM(ezPWM.PWMPin.PIN12);


