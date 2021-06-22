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

const Content = props => {

  return(
    <div>
      <Part content = {props.parts[0].name} number = {props.parts[0].exercises} />
      <Part content = {props.parts[1].name} number = {props.parts[1].exercises} />
      <Part content = {props.parts[2].name} number = {props.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  
  return(
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {

  const course = 'Half Stack application development'
  const parts = [

    {
      name: 'Fundamentals of React',
      exercises: 10
    },

    {
    name: 'Using props to pass data',
    exercises: 7
    },
    
    {
    name: 'State of a component',
    exercises: 14
    }

  ]

  return (
    <div>
      <Header courseName={course} />
      
      <Content parts={parts} />
    
      <Total parts={parts} />
    </div>
  )
}

export default App