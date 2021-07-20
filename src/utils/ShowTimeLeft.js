import React, { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export function ShowTimeLeft() {
    const { tokenExpiration } = useContext(GlobalContext);
    const [timer, setTimer] = useState(undefined)
    const [secondsLeft, setSecondsLeft] = useState(undefined)

    useEffect(() => {
            setTimer(setInterval(() => showTimeLeft(), 10000))

            // this function is automatically called when the component unmounts
            return function cleanup() {
                clearInterval(timer);
            }
        },[]
    );

    function showTimeLeft() {
        //console.log({tokenExpiration})
        alert(tokenExpiration)
        //let expiration = new Date(tokenExpiration)

        setSecondsLeft(1)
    }

    alert('showtimeleft')

    return (<h5>{secondsLeft}</h5>)

}