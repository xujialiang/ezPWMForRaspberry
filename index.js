var rpio = require('rpio');

class ezPWMForRaspberry {
    static PWMPin = {
        PIN12: 12,
        PIN32: 32,
        PIN33: 33,
        PIN35: 35,
        PIN_PRESERVE: rpio.PIN_PRESERVE,
        PIN_RESET: rpio.PIN_RESET,
    }

    /**
     * 
     * @mapping physical或gpio, 默认physical，就是板子上从上到下1~40。
     * @divosor 默认2048。用于设置PWM的输出频率, 如输出2.6367MHz的PWM频率, divosor=54e6/2048 (树莓派4B之前的版本，时钟频率是19.2MHz, 4B的时钟频率是54MHz)
     */
    constructor(mapping='physical', divosor=2048){
        var options = {
            gpiomem: false,          /* 由于需要使用/dev/mem, 而不是gpiomem，运行时，需要root权限 */
            mapping: mapping,       /* gpio | physical*/
            mock: undefined,        /* Emulate specific hardware in mock mode */
            close_on_exit: true,    /* On node process exit automatically close rpio */
        }
        rpio.init(options);
        rpio.pwmSetClockDivider(divosor);
        process.on('exit', function() {
            rpio.exit();
        });
    }

    /**
     * PWM频率是Hz为单，赫兹(Hz)的定义为每一秒周期性事件发生的次数，就是每秒钟发送x次pwm信号。
     * 
     * 参考 https://raspberrypi.stackexchange.com/questions/4906/control-hardware-pwm-frequency/9725#9725
     * 
     * 参考 https://github.com/jperkin/node-rpio/issues/2
     * 
     * @pin 物理引脚编号
     * @low 占空比 = low/range
     * @total 精度，一个周期内，。
     */
     openPWM(pin, low=0, total=100){  
        rpio.open(pin, rpio.PWM);
        rpio.pwmSetRange(pin, total);
        rpio.pwmSetData(pin, low)
    }

    /**
     * 更新PWM占空比
     * 
     * @pin 物理引脚编号
     * @low 占空比 = low/range
     */
    updatePWM(pin, low=0){  
        rpio.pwmSetData(pin, low)
    }

    /**
     * 设置PWM占空比
     * 
     * PWM频率是Hz为单，赫兹(Hz)的定义为每一秒周期性事件发生的次数，就是每秒钟发送x次pwm信号。
     * 
     * 参考 https://raspberrypi.stackexchange.com/questions/4906/control-hardware-pwm-frequency/9725#9725
     * 
     * 参考 https://github.com/jperkin/node-rpio/issues/2
     * 
     * @pin 物理引脚编号
     * @percent 0~100
     * @divosor 默认2048, 需是2的次幂。用于设置PWM的输出频率, 如输出2.6367MHz的PWM频率, divosor=54e6/2048 (树莓派4B之前的版本，时钟频率是19.2MHz, 4B的时钟频率是54MHz)
     */
     openPWMByPercent(pin){
        rpio.open(pin, rpio.PWM);
        rpio.pwmSetRange(pin, 100);
        rpio.pwmSetData(pin, 0);
    }

    /**
     * 设置PWM占空比
     * 
     * @pin 物理引脚编号
     * @percent 0~100
     */
    updatePWMByPercent(pin, percent=0){
        rpio.pwmSetData(pin, percent)
    }

    /**
     *   rpio.PIN_RESET: 变为Input模式
     *   rpio.PIN_PRESERVE:保留当前配置
     * 
     * @param pin - pin number to close
     * @reset PIN_RESET | PIN_PRESERVE, default = PIN_RESET
     */
    closePWM(pin, reset=ezPWMForRaspberry.PWMPin.PIN_PRESERVE){
        this.updatePWMByPercent(pin,0);
        rpio.close(pin, reset);
    }

}

module.exports = ezPWMForRaspberry;