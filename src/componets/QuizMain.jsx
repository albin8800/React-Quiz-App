import React from 'react'
import Timer from './Timer';

const QuizMain = ({numOfQuestion,index,points,totalPoints,answer,remainingTime,dispatch}) => {
  return (
    <section className="quiz">
        <div className="progress-container">
            <progress value={index+Number(answer!==null)} max={numOfQuestion}></progress>   
        </div>
        <div className="progress-info">
            <span className='question-count'>Ques: {index+1}/{numOfQuestion}</span>
            <p>Points: <span>{points}/{totalPoints}</span></p>
            <Timer remainingTime={remainingTime} dispatch={dispatch}/>
        </div>
    </section>
  )
}

export default QuizMain
