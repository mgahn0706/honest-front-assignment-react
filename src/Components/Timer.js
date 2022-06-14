import {useEffect, useState} from "react";

const Timer = () => {
    const [time, setTime] = useState(3 * 60);


    useEffect(()=>{
        const countdown = setInterval(()=>{
            const newTime = time-1;
            if(newTime<0){
                setTime(0);
                clearInterval(countdown);
            }
            else{
                setTime(newTime);
            }
        }, 1000);
        return () => {clearInterval(countdown)};
    });

    const formatTime = (currTime) => {
        const minute = parseInt(currTime/60);
        const second = currTime%(60);
        return `${minute}:${second}`;
    }



    return (
        <div className="timer">{formatTime(time)}</div>
    )
}

export default Timer;