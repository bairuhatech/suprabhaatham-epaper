import React, { useEffect, useState } from "react";
import "./style.css";

const moment = require("moment");

const Timer = (props: any) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="Header-timerBox">
      <div className="Header-txt1">{moment().format("DD")}</div>
      <div style={{ marginLeft: 5 }}>
        <div className="Header-txt2"> {moment().format("dddd")}</div>
        <div className="Header-txt3">
          {currentTime.toLocaleString("en-in", {
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default Timer;
