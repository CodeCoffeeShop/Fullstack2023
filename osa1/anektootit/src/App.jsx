import { useState } from 'react'

const Button =(props) => {
  return (
    <button onClick={props.hC}>
      {props.text}
    </button>
  )
}

const Title = ({text}) => {
  return(
    <h2>{text}</h2>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  console.log(points)
  
  const [selected, setSelected] = useState(0)
  const getAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  
  let max = Math.max(...points)
  max = points.indexOf(max)

  const voteAnecdote = () => {
    console.log(selected)
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    console.log(points, copy)
  }
  

  return (
    <div>
      <Title text="Anecdote of the day" />
      <p>
        {anecdotes[selected]}
      </p>

      <p>
        has {points[selected]} votes
      </p>

      <p>
        <Button hC={() => voteAnecdote()} vote={selected} text="vote" />
        <Button hC={() => getAnecdote()} text="next anecdote" />
      </p>
      
      <Title text="Anecdote with most votes" />
      <p>
        {anecdotes[max]}
      </p>
      <p>has {points[max]} points</p>
      
    </div>
  )
}

export default App