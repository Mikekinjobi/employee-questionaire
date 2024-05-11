import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{`${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`}</p>
    </div>
  );
};

export default CountdownTimer;
