import React, { useRef } from 'react';
import useSound from 'use-sound';
import confetti from 'canvas-confetti';
import correctSound from '../sounds/correct-6033.mp3';
import wrongSound from '../sounds/wrong-47985.mp3';

const Option = ({ quizQuestion, dispatch, answer }) => {
  const hasAnswered = answer !== null;
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);

  const fireworkEffect = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleAnswer = (index) => {
    if (index === quizQuestion.correctAnswer) {
      playCorrect();
      fireworkEffect(); // Fireworks effect
    } else {
      playWrong();
    }

    dispatch({ type: 'newAnswer', payload: index });
  };

  return (
    <div className="options">
      {quizQuestion.options.map((option, index) => (
        <button
          key={option}
          className={`option ${hasAnswered ? (index === quizQuestion.correctAnswer ? 'correct' : 'wrong') : ''}`}
          onClick={() => handleAnswer(index)}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Option;
