import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [maxIndex, setMaxIndex] = useState(0)

  const handleRandom = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length)
    while (randomIndex === selected) {
      randomIndex = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    /* to prevent re-renders i moved the max index logic to the handleVote function because the votes are not saved meaning every time you visit the site there will be 0 votes, so there is no need to try find votes that dont exist yet */
    const newMax = copy.reduce((highest, currentCount, index) => 
      currentCount > copy[highest] ? index : highest, 0);
    setMaxIndex(newMax)
  }

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={handleRandom}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <h1>most voted anecdote</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {vote[maxIndex]} votes</p>
    </div>
  )
}

export default App