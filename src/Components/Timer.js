import {useEffect, useState} from "react";

const Timer = ({setTimerRunning, resend}) => {
    const [time, setTime] = useState(3 * 60);
        useEffect(()=>{setTime(3*60);},[resend])

    useEffect(()=>{
            const countdown = setInterval(() => {
                const newTime = time-1;
                if (newTime < 0) {
                    setTime(0);
                    setTimerRunning(false);
                    clearInterval(countdown);
                    window.alert("인증시간이 만료되었습니다. 인증문자를 재전송해주세요.")
                } else {
                    setTime(newTime);
                }
            }, 1000);
            return () => {
                clearInterval(countdown)
            };

    });

    const formatTime = (currTime) => {
        const minute = `${parseInt(currTime/60)}`;
        const second = `${currTime%(60)}`;
        return second.length===2 ? minute+":"+second : minute+":0"+second;
    }



    return (
        <div className="timer">{formatTime(time)}</div>
    )
}

export default Timer;