/**
 * ckamkerBase blocks
 */
//% weight=100 color=#436EEE icon="\uf1cb"
//% block="Ckmaker-Base"
namespace custom {
    export enum speedEnum {
        //% block="SPEED1"
        SPEED1 = 8,
        //% block="SPEED2"
        SPEED2 = 4,
        //% block="SPEED3"
        SPEED3 = 1
    };

    const stepperAllSteps = 2048;
    //motor L
    let stepperCh0: DigitalPin;
    let stepperCh1: DigitalPin;
    let stepperCh2: DigitalPin;
    let stepperCh3: DigitalPin;
    //motor R
    let stepperCh4: DigitalPin;
    let stepperCh5: DigitalPin;
    let stepperCh6: DigitalPin;
    let stepperCh7: DigitalPin;

    let stepperDirection: number;
    //let stepperDirectionR: number;

    let stepperSpeed: speedEnum;

    /**
     * TODO: describe your function here
     * @param in0 describe parameter here, eg: DigitalPin.P0
     * @param in1 describe parameter here, eg: DigitalPin.P1
     * @param in2 describe parameter here,eg: DigitalPin.P2
     * @param in3 describe parameter here,eg: DigitalPin.P8

     */
    //% blockId=ckmaker_stepperMotorLInitL block="stepperMotorLInitL |in0 %in0|in1 %in1|in2 %in2|in3 %in3"
    //% in0.fieldEditor="gridpicker" in0.fieldOptions.columns=4
    //% in0.fieldOptions.tooltips="false" in0.fieldOptions.width="300"
    //% in1.fieldEditor="gridpicker" in1.fieldOptions.columns=4
    //% in1.fieldOptions.tooltips="false" in1.fieldOptions.width="300"
    //% in2.fieldEditor="gridpicker" in2.fieldOptions.columns=4
    //% in2.fieldOptions.tooltips="false" in2.fieldOptions.width="300"
    //% in3.fieldEditor="gridpicker" in3.fieldOptions.columns=4
    //% in3.fieldOptions.tooltips="false" in3.fieldOptions.width="300"
    //% weight=200 blockGap=3 color=#00BFFF



    export function stepperMotorLInitL(in0: DigitalPin, in1: DigitalPin, in2: DigitalPin, in3: DigitalPin) {
        stepperCh0 = in0;
        stepperCh1 = in1;
        stepperCh2 = in2;
        stepperCh3 = in3;
        stepperSpeed = speedEnum.SPEED1;
    }

    /**
     * TODO: describe your function here
     
     * @param in4 describe parameter here, eg: DigitalPin.P0
     * @param in5 describe parameter here, eg: DigitalPin.P1
     * @param in6 describe parameter here,eg: DigitalPin.P2
     * @param in7 describe parameter here,eg: DigitalPin.P8
    //% blockId=ckmaker_stepperMotorLInitR block="stepperMotorLInitR |in4 %in4|in5 %in5|in6 %in6|in7 %in7"
    //% in4.fieldEditor="gridpicker" in4.fieldOptions.columns=4
    //% in4.fieldOptions.tooltips="false" in4.fieldOptions.width="300"
    //% in5.fieldEditor="gridpicker" in5.fieldOptions.columns=4
    //% in5.fieldOptions.tooltips="false" in5.fieldOptions.width="300"
    //% in6.fieldEditor="gridpicker" in6.fieldOptions.columns=4
    //% in6.fieldOptions.tooltips="false" in6.fieldOptions.width="300"
    //% in7.fieldEditor="gridpicker" in7.fieldOptions.columns=4
    //% in7.fieldOptions.tooltips="false" in7.fieldOptions.width="300"
    //% weight=200 blockGap=3 color=#00BFFF
     */
    export function stepperMotorLInitR(in4: DigitalPin, in5: DigitalPin, in6: DigitalPin, in7: DigitalPin) {
        stepperCh4 = in4;
        stepperCh5 = in5;
        stepperCh6 = in6;
        stepperCh7 = in7;
        stepperSpeed = speedEnum.SPEED1;
    }


    //%blockId=ckmaker_setstepperSpeed block="setstepperSpeed |%speed"
    //% weight=199 blockGap=3 color=#00BFFF
    export function setstepperSpeed(speed: speedEnum) {
        stepperSpeed = speed;
    }

    //%blockId=ckmaker_stepperTurn block="stepperTurn |%n"
    //% weight=198 blockGap=3 color=#00BFFF
    export function stepperTurn(n: number) {
        stepperStep(n * stepperAllSteps);
    }

    //%blockId=ckmaker_stepperDegree block="stepperDegree |%degree"
    //% weight=197 blockGap=3 color=#00BFFF
    export function stepperDegree(degree: number) {
        let i = degree * stepperAllSteps / 360;
        stepperStep(i);
    }
    //%blockId=ckmaker_stepperStep block="stepperStep |%d"
    //% weight=196 blockGap=30 color=#00BFFF
    export function stepperStep(step: number) {
        let i: number;
        let j: number;
        if (step > 0) stepperDirection = 1;
        else stepperDirection = 0;
        if (stepperDirection == 1) {
            for (i = 0; i < step; i++) {
                let j = i;
                setpperMotorL(i % 4);
                setpperMotorR(j % 4);

                basic.pause(stepperSpeed);
            }
        }
        else if (stepperDirection == 0) {
            for (i = -step; i > 0; i--) {
                let j = i;
                setpperMotorL(i % 4);
                setpperMotorR(j % 4);

                basic.pause(stepperSpeed);
            }
        }
        pins.digitalWritePin(stepperCh0, 0);
        pins.digitalWritePin(stepperCh1, 0);
        pins.digitalWritePin(stepperCh2, 0);
        pins.digitalWritePin(stepperCh3, 0);
        pins.digitalWritePin(stepperCh4, 0);
        pins.digitalWritePin(stepperCh5, 0);
        pins.digitalWritePin(stepperCh6, 0);
        pins.digitalWritePin(stepperCh7, 0);

    }
    export function setpperMotorL(step: number) {
        switch (step) {
            case 0: //1010
                pins.digitalWritePin(stepperCh0, 1);
                pins.digitalWritePin(stepperCh1, 0);
                pins.digitalWritePin(stepperCh2, 0);
                pins.digitalWritePin(stepperCh3, 0);
                break;
            case 1: //0110
                pins.digitalWritePin(stepperCh0, 0);
                pins.digitalWritePin(stepperCh1, 1);
                pins.digitalWritePin(stepperCh2, 0);
                pins.digitalWritePin(stepperCh3, 0);
                break;
            case 2: //0101
                pins.digitalWritePin(stepperCh0, 0);
                pins.digitalWritePin(stepperCh1, 0);
                pins.digitalWritePin(stepperCh2, 1);
                pins.digitalWritePin(stepperCh3, 0);
                break;
            case 3: //1001
                pins.digitalWritePin(stepperCh0, 0);
                pins.digitalWritePin(stepperCh1, 0);
                pins.digitalWritePin(stepperCh2, 0);
                pins.digitalWritePin(stepperCh3, 1);
                break;
        }
    }
    export function setpperMotorR(step: number) {
        switch (step) {
            case 0: //1010
                pins.digitalWritePin(stepperCh4, 1);
                pins.digitalWritePin(stepperCh5, 0);
                pins.digitalWritePin(stepperCh6, 0);
                pins.digitalWritePin(stepperCh7, 0);
                break;
            case 1: //0110
                pins.digitalWritePin(stepperCh4, 0);
                pins.digitalWritePin(stepperCh5, 1);
                pins.digitalWritePin(stepperCh6, 0);
                pins.digitalWritePin(stepperCh7, 0);
                break;
            case 2: //0101
                pins.digitalWritePin(stepperCh4, 0);
                pins.digitalWritePin(stepperCh5, 0);
                pins.digitalWritePin(stepperCh6, 1);
                pins.digitalWritePin(stepperCh7, 0);
                break;
            case 3: //1001
                pins.digitalWritePin(stepperCh4, 0);
                pins.digitalWritePin(stepperCh5, 0);
                pins.digitalWritePin(stepperCh6, 0);
                pins.digitalWritePin(stepperCh7, 1);
                break;
        }
    }

    //% blockId=ckmaker_ultrasonic block="Ultrasonic|inPin %inPin|outPin %outPin"
    //% weight=190 color=#0000FF
    export function ultrasonic(inPin: DigitalPin, outPin: DigitalPin): number {

        // send pulse
        pins.setPull(inPin, PinPullMode.PullNone);
        pins.digitalWritePin(inPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(inPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(inPin, 0);

        // read pulse
        let dat = pins.pulseIn(outPin, PulseValue.High, 25000);
        return dat * 10 / 6 / 58;
    }

}
