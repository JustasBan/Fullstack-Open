import React from 'react'

const Header = (props) => {

  return(
    <div>
      <h1>{props.courseName}</h1>
    </div>
  )
}

const Part = (props) => {

  return(
    <div>
      <p>{props.content} {props.number}</p>
    </div>
  )
}

const Content = (props) => {

  return(
    <div>
      <Part content = {props.content1} number = {props.number1} />
      <Part content = {props.content2} number = {props.number2} />
      <Part content = {props.content3} number = {props.number3} />
    </div>
  )
}

const Total = (props) => {
  
  return(
    <div>
      <p>Number of exercises {props.number1 + props.number2 + props.number3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header courseName={course} />
      
      <Content content1={part1} number1={exercises1} content2={part2} number2={exercises2} content3={part3} number3={exercises3} />
    
      <Total number1={exercises1} number2={exercises2} number3={exercises3} />
    </div>
  )
}

export default App