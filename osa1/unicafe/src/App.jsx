import { useState } from 'react'

const Header = ({title}) => {
  return (
    <h2>
        {title}
    </h2>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.hC}>
      {props.text}
    </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics =({g, n, b}) => {

  const all = g + n + b
  if( all != 0) {
    const average = all < 1 ? 0 : (g + (0-b)) / all
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine name="good" value={g} />
            <StatisticLine name="neutral" value={n} />
            <StatisticLine name="bad" value={b} />
            <StatisticLine name="all" value={all} />
            <StatisticLine name="average" value={average} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <p>No feedback given</p>
  )

}

const App = () => {
  //Napit
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //console.log(good, neutral, bad)

  return (
    <div>
      <Header title={"give feedback"} />
    
      <Button hC={() => setGood(good + 1)} text="good" />
      <Button hC={() => setNeutral(neutral + 1)} text="neutral" />
      <Button hC={() => setBad(bad + 1)} text="bad" />

      <Header title={"statistics"} />

      <Statistics g={good} n={neutral} b={bad} />
      
    </div>
  )
}
export default App
