import React, { useState, useEffect } from 'react';

const IntroPage = ({ dispatch, onComplete }) => {
  const [countdown, setCountdown] = useState(5); 

  useEffect(() => {
    if (countdown === 0) {
      onComplete(); 
    } else {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [countdown, onComplete]);

  return (
    <div className="intro-container">
      <h1>Testline </h1>
      <p>Quiz Starts in</p>
      <h2>{countdown}</h2>
    </div>
  );
};

export default IntroPage;
