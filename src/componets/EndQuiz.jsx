import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const EndQuiz = ({ points, totalPoints, highScore, dispatch }) => {
  const percentage = (points / totalPoints) * 100;
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);

  let emoji, message;
  
  if (percentage === 100) {
    emoji = "💯🎉";
    message = "Perfect Score!";
  } else if (percentage > 70) {
    emoji = "😃👏🏻";
    message = "Great Job!";
  } else if (percentage >= 50) {
    emoji = "😊";
    message = "Great Effort!";
  } else {
    emoji = "😕";
    message = "Keep Trying! You’ll do better next time!";
  }

  // Trigger Effects based on Score
  useEffect(() => {
    if (percentage > 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); // Hide after 4s
    } else {
      setShakeEffect(true);
      setTimeout(() => setShakeEffect(false), 1000); // Shake once for 1s
    }
  }, [percentage]);

  return (
    <div className={`completion ${shakeEffect ? "shake" : ""}`}>
      {showConfetti && <Confetti />}
      <h2 className="fade-in">Thank You for Completing the Quiz</h2>
      <span className="scale">{emoji} - {message}</span>
      <p className='result'>You Scored <strong>{points}</strong> out of <strong>{totalPoints}</strong> (<strong>{Math.round(percentage)}%</strong>)</p>
      <p className="highscore">High Score: <strong>{highScore}</strong></p>
      <button className="animated-button" onClick={() => dispatch({ type: "restart" })}>Restart Quiz</button>
    </div>
  );
};

export default EndQuiz;