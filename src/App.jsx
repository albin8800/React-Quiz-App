import React, { useEffect, useReducer, useState } from 'react';
import Header from './componets/Header';
import Loading from './componets/Loading';
import Error from './componets/Error';
import Question from './componets/Question';
import QuizMain from './componets/QuizMain';
import NextButton from './componets/NextButton';
import EndQuiz from './componets/EndQuiz';
import IntroPage from './componets/IntroPage'; // Add the intro page component here

const SECS_PER_QUESTION = 20;
const initialState = {
  quizQuestion: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingTime: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetch_success':
      return {
        ...state,
        quizQuestion: action.payload,
        status: 'ready',
      };
    case 'fetch_error':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return {
        ...state,
        status: 'active',
        remainingTime: state.quizQuestion.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const question = state.quizQuestion.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctAnswer ? state.points + question.points : state.points,
      };
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    case 'restart':
      return {
        quizQuestion: state.quizQuestion,
        status: 'ready',
        highScore: state.highScore,
        answer: null,
        points: 0,
        index: 0,
      };
    case 'timer':
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? 'finished' : state.status,
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { quizQuestion, status, index, answer, points, highScore, remainingTime } = state;
  const [isIntro, setIsIntro] = useState(true); // Add state for intro page
  const numOfQuestion = quizQuestion.length;
  const totalPoints = quizQuestion.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch('http://localhost:8000/quizQuestion')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'fetch_success', payload: data });
      })
      .catch(() => dispatch({ type: 'fetch_error' }));
  }, []);

  const handleIntroComplete = () => {
    setIsIntro(false); // Hide intro after countdown is done
    dispatch({ type: 'start' }); // Start the quiz
  };

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'error' && <Error />}
      {isIntro && (
        <IntroPage dispatch={dispatch} onComplete={handleIntroComplete} /> // Render IntroPage before quiz
      )}
      {!isIntro && status === 'ready' && (
        <Header numOfQuestion={numOfQuestion} dispatch={dispatch} />
      )}
      {status === 'active' && (
        <>
          <QuizMain
            numOfQuestion={numOfQuestion}
            index={index}
            points={points}
            totalPoints={totalPoints}
            answer={answer}
            remainingTime={remainingTime}
            dispatch={dispatch}
          />
          <Question quizQuestion={quizQuestion[index]} dispatch={dispatch} answer={answer} />
          <NextButton dispatch={dispatch} answer={answer} index={index} numOfQuestion={numOfQuestion} />
        </>
      )}
      {status === 'finished' && <EndQuiz points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch} />}
    </>
  );
};

export default App;
