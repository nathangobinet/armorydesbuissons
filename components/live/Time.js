import React, { useState, useEffect } from 'react';

export function getTimePastFromDate(dateString) {
  const unixTimeDate = Date.parse(dateString);
  const msPast = Date.now() - unixTimeDate;
  return {
    seconds: Math.floor((msPast / 1000) % 60),
    minutes: Math.floor((msPast / (1000 * 60)) % 60),
    hours: Math.floor((msPast / (1000 * 60 * 60)) % 24),
  };
}

function shapeTime(time) {
  const shapedTime = {
    hours: time.hours === 0 ? '' : `${time.hours}:`,
    minutes: (time.minutes < 10) ? `0${time.minutes}:` : `${time.minutes}:`,
    seconds: (time.seconds < 10) ? `0${time.seconds}` : time.seconds,
  };
  return shapedTime.hours + shapedTime.minutes + shapedTime.seconds;
}

function incrementTime(setTime) {
  setTime((crtTime) => {
    const newTime = { ...crtTime };
    if (crtTime.seconds === 59 && crtTime.minutes === 59) {
      newTime.seconds = 0; newTime.minutes = 0; newTime.hours += 1;
    } else if (crtTime.seconds === 59 && crtTime.minutes !== 59) {
      newTime.seconds = 0; newTime.minutes += 1;
    } else {
      newTime.seconds += 1;
    }
    return newTime;
  });
}

export default function Time({ date }) {
  const { hours, minutes, seconds } = getTimePastFromDate(date);
  const [time, setTime] = useState({ hours, minutes, seconds });

  useEffect(() => {
    const interval = setInterval(() => {
      incrementTime(setTime);
    }, 1000);
    return (() => { clearInterval(interval); });
  }, []);

  // Format 1:10:23
  return (
    <span>{shapeTime(time)}</span>
  );
}
