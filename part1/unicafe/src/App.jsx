import { useState } from 'react'

const StatisticsLine = (props) =>{
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let all = props.good.count + props.neutral.count + props.bad.count
  
  let average = 0
  if (props.good.count + props.neutral.count + props.bad.count > 0){
      average = (props.good.value * props.good.count + props.neutral.value * props.neutral.count + props.bad.value * props.bad.count) / (props.good.count + props.neutral.count + props.bad.count)
  }

  let percentPositive = 0
  if (props.good.count + props.neutral.count + props.bad.count > 0){
    percentPositive = (props.good.count / all) * 100
  }
  percentPositive = `${percentPositive.toFixed(2)}%`

  
  
  return (
    <div>
      <h1>statistics</h1>
      {all ? 
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good.count}/>
          <StatisticsLine text="neutral" value={props.neutral.count}/>
          <StatisticsLine text="bad" value={props.bad.count}/>
          <StatisticsLine text="all" value={all}/>
          <StatisticsLine text="average" value={average}/>
          <StatisticsLine text="positive" value={percentPositive}/>
        </tbody>
      </table>
      : <p>no feedback given</p>}
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState({
    count:0,
    value:1
  })
  const [neutral, setNeutral] = useState({
    count:0,
    value:0
  })
  const [bad, setBad] = useState({
    count:0,
    value:-1
  })
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood({...good, count: good.count + 1})}>good</button>
      <button onClick={() => setNeutral({...neutral, count: neutral.count + 1})}>neutral</button>
      <button onClick={() => setBad({...bad, count: bad.count + 1})}>bad</button>
      
       <Statistics good={good} neutral={neutral} bad={bad} /> 
    
    </div>
  )
}

export default App