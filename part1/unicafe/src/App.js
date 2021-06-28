import React, { useState } from 'react'

const Button = ({ratingString, handleClick}) => (

  <button onClick={handleClick}>
    {ratingString}
  </button>
)

const FormatedStringBasicStats = ({rating, string}) =>{
  
  string = string.concat(' ')

  return(
  <div>
    {string}{rating}
  </div>)
}

const Statistic = (props) => {

  //                good          neutral           bad
  let count=props.value[0] + props.value[1] + props.value[2]

  const calcAvg = () => {

    return (props.value[0]-props.value[2])/count
  }

  const calcPositive = () =>{

    return props.value[0]/count
  }

  let percentPositive = (calcPositive(props.value)*100)

  switch (props.string) {

    case 'good':
      return(<FormatedStringBasicStats string={'good'} rating={props.value[0]} />)


    case 'neutral':
      return(<FormatedStringBasicStats string={'neutral'} rating={props.value[1]} />)


    case 'bad':
      return(<FormatedStringBasicStats string={'bad'} rating={props.value[2]} />)


    case 'all':
      return(<FormatedStringBasicStats string={'all'} rating={count} />)


    case 'average':
      return(<FormatedStringBasicStats string={'average'} rating={calcAvg(props.list)} />)


    case 'positive':
      return(<FormatedStringBasicStats string={'positive'} rating={percentPositive + '%'} />)
    
    default:
      break;
  }
}

const Statistics = (props) => {
  
  if((props.good + props.bad + props.neutral)===0) {

    return(
      
      <div>
        <h1>statistics</h1>
        <p>no feedback given</p>
      </div>
    )
  }
  else{

    return(

    <div>
        <h1>statistics</h1>
        <Statistic string={"good"} value={[props.good, props.neutral, props.bad]}/>
        <Statistic string={"neutral"} value={[props.good, props.neutral, props.bad]}/>
        <Statistic string={"bad"} value={[props.good, props.neutral, props.bad]}/>
        <Statistic string={"all"} value={[props.good, props.neutral, props.bad]}/>
        <Statistic string={"average"} value={[props.good, props.neutral, props.bad]}/>
        <Statistic string={"positive"} value={[props.good, props.neutral, props.bad]}/>
      </div>
    )
  }

  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandle = () =>{
    setGood(good+1)
  }

  const neutralClickHandle = () =>{
    setNeutral(neutral+1)
  }

  const badClickHandle = () =>{
    setBad(bad+1)
  }

  return (

    <div>
      <h1>give feedback</h1>

      <Button ratingString={"good"} handleClick={goodClickHandle} />
      <Button ratingString={"neutral"} handleClick={neutralClickHandle} />
      <Button ratingString={"bad"} handleClick={badClickHandle} />

      <Statistics 
      goodClickHandle={goodClickHandle} 
      neutralClickHandle={neutralClickHandle} 
      badClickHandle={badClickHandle} 
      good={good} 
      neutral={neutral} 
      bad={bad} />
    </div>
  )
}

export default App
