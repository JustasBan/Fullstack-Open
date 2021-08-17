import React from 'react';

const Course = ({courses}) => {
  
  return (

    <div>

      {courses.map((course) => (

        <div key={course.id}>

        <h1 >{course.name}</h1>
        <div >{course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}</div>
        <strong >{course.parts.reduce((sum, part) => sum + part.exercises, 0)}</strong>
        
        </div>)
        
        )}

    </div>
  )
}

export default Course