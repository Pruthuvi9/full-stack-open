import { useDispatch, useSelector } from 'react-redux'
import { voteTo } from '../reducers/anecdoteReducer'
import { setFilter } from '../reducers/filterReducer'
import {
  setNotification,
  resetNotification,
} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, clickHandler }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={clickHandler}>vote</button>
      </div>
    </div>
  )
}

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const searchTerm = event.target.value
    // console.log(searchTerm)
    dispatch(setFilter(searchTerm))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    // console.log('anecdotes', anecdotes)
    const list =
      filter === ''
        ? anecdotes
        : anecdotes.filter((a) =>
            a.content.includes(filter)
          )
    return [...list].sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  // const vote = (id) => {
  //   dispatch(voteTo(id))
  // }

  return (
    <>
      <Filter />
      <div>
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            clickHandler={() => {
              dispatch(voteTo(anecdote.id))
              dispatch(
                setNotification(
                  `You voted ${anecdote.content}`
                )
              )
              setTimeout(() => {
                dispatch(resetNotification())
              }, 5000)
            }}
          />
        ))}
      </div>
    </>
  )
}

export default AnecdoteList
