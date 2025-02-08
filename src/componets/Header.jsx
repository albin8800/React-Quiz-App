import React from 'react'

const Header = ({ numOfQuestion, dispatch, remainingTime }) => {

  return (
    <div className='welcome'>
      <h1 className="typewriter">Welcome To <span className="highlight">Testline</span> Quiz</h1>
      <p className="scale-fade">Total Question: {numOfQuestion}</p>
      <button className="animated-btn" onClick={() => dispatch({ type: "start" })}>Start Quiz</button>
    </div>
  )
}

export default Header;