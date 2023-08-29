import { useState } from 'react'

const Header = ({title}) => {
  return (
    <h2>
        {title}
    </h2>
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

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}
export default App
