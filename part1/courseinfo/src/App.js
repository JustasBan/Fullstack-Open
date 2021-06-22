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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseName={course} />
      
      <Content content1={part1.name} number1={part1.exercises} content2={part2.name} number2={part2.exercises} content3={part3.name} number3={part3.exercises} />
    
      <Total number1={part1.exercises} number2={part2.exercises} number3={part3.exercises} />
    </div>
  )
}

export default App