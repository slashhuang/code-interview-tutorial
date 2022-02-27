/**
 * @desc countDownTimer
 * @review: xiaowei.xue@shopee.com
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './counter.css'
const min2Second = 60;
const hour2Second = 60 * min2Second;
const day2Second = 24 * hour2Second;
/**
 * @desc hooks to calculate timer
 * @param {*} valueInSecond 
 * @returns 
 */
const useTimerCountDown = (valueInSecond) => {
    const initTimeInSecond = useMemo(() => valueInSecond, [])
    const timerStart = useMemo(() => Date.now(), [])
    const [elapseTimeInSecond, setElapseTimeInSecond] = useState(0);
    const timeTransformer = useCallback((valInSecond) => {
        const dayRemain = Math.floor(valInSecond / day2Second);
        const hourRemain = Math.floor((valInSecond % day2Second)/hour2Second);
        const minRemain = Math.floor((valInSecond % hour2Second)/min2Second);
        const secRemain = (valInSecond % min2Second);
        const result = [
            (dayRemain + '').padStart(2, '0'),
            (hourRemain + '').padStart(2, '0'),
            (minRemain + '').padStart(2, '0'),
            (secRemain + '').padStart(2, '0'),
        ].map((timeFrgment) => {
            return timeFrgment.split('');
        });
        return result;
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            const elapseTimeInSecond = Math.round((Date.now() - timerStart) / 1000);
            setElapseTimeInSecond(elapseTimeInSecond);
            if (elapseTimeInSecond >= initTimeInSecond) {
                clearInterval(interval)
            }
        }, 1000);
        return () => {
            clearInterval(interval)
        };
    }, [])
    return timeTransformer(initTimeInSecond - elapseTimeInSecond);
}
/**
 * @desc CountDownNode display
 */
const CountDownNode = ({ type, currentTens, currentOnes }) => {
    const numNodeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => {
        return (
            <div className="digit" key={ele}>{ele}</div>
        );
    });
    const tensStyle = {
        transform: `translateY(-${currentTens * 17}px)`
    }
    const onesStyle = {
        transform: `translateY(-${currentOnes * 17}px)`
    }
    return (
        <div className={`count-down-item-wrapper`}>
            <div className={`time-item tens-digit`} style={tensStyle}>
                {
                    numNodeList
                }
            </div>
            <div className={`time-item ones-digit`} style={onesStyle}>
                {
                    numNodeList
                }
            </div>
        </div>
    )
}
export const TimerCount = (props) => {
    const { value } = props;
    const [
        dayTuple,
        hourTuple,
        minuteTuple,
        secondTuple
    ] = useTimerCountDown(value);
    return (
        <div className="shopee-countdown-timer-wrapper">
            {/* 分钟钟倒计时 */}
            <CountDownNode type="day" currentTens={dayTuple[0]} currentOnes={dayTuple[1]} />
            <div className="gap"></div>
            <CountDownNode type="hour" currentTens={hourTuple[0]} currentOnes={hourTuple[1]} />
            <div className="gap"></div>
            <CountDownNode type="minute" currentTens={minuteTuple[0]} currentOnes={minuteTuple[1]} />
            <div className="gap"></div>
            <CountDownNode type="second" currentTens={secondTuple[0]} currentOnes={secondTuple[1]} />
        </div>
    )
}