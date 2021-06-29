import React, { isValidElement, useState } from 'react'

const Button = ({string, handleClick}) => (

  <button onClick={handleClick}>
    {string}
  </button>
)

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0))

  const anecdoteVoteHandle = () =>{

    const copy= [...votes]
    copy[selected] += 1

    setVotes(copy)

    const getRandomInt = (max) => (
      Math.floor(Math.random() * max)
    )

    setSelected(getRandomInt(7))
  }

  const anecdoteClickHandle = () =>{

    const getRandomInt = (max) => (
      Math.floor(Math.random() * max)
    )

    setSelected(getRandomInt(7))
  }

  var arrayMaxIndex = function(array) {
    return array.indexOf(Math.max.apply(null, array));
  };

  

  return (

    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      has {votes[selected]} votes
      <br />
      <Button string='next anecdote' handleClick={anecdoteClickHandle} />
      <Button string='vote & next' handleClick={anecdoteVoteHandle} />

      <h1>Anecdote with most votes</h1>
      {anecdotes[arrayMaxIndex(votes)]}
      <br />
      has {votes[arrayMaxIndex(votes)]} votes
    </div>
  )
}

export default App