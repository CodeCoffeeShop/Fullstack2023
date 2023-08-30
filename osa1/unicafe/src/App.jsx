import { useState } from 'react'

const Header = ({title}) => {
  return (
    <h2>
        {title}
    </h2>
  )
}

const Statistics =({g, n, b}) => {

  const all = g + n + b
  const average = all < 1 ? 0 : (g + (0-b)) / all
  
  return (
    <div>
      <p>good {g}</p>
      <p>neutral {n}</p>
      <p>bad {b}</p>
      <p>all {all}</p>
      <p>average {average}</p>
    </div>
  )
}

const App = () => {
  //Napit
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good, neutral, bad)

  return (
    <div>
      <Header title={"give feedback"} />
    
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>

      <Header title={"statistics"} />

      <Statistics g={good} n={neutral} b={bad} />
      
    </div>
  )
}
export default App
