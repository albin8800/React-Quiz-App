import React from 'react'
import Option from './Option'

const Question = ({quizQuestion, dispatch, answer}) => {
  
  
  
  return (
    <div className='question-container'>
        <h2 className='question'>{quizQuestion.question}</h2>
      <Option quizQuestion={quizQuestion} dispatch={dispatch} answer={answer}/>
    </div>
  )
}

export default Question 