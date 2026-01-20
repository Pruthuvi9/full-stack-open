import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setFilter } from '../reducers/filterReducer'
import { setNotification } from '../reducers/notificationReducer'
import { selectVisibleAnecdotes } from '../selectors'

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
  const anecdotes = useSelector(selectVisibleAnecdotes)
  const dispatch = useDispatch()

  return (
    <>
      <Filter />
      <div>
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            clickHandler={() => {
              dispatch(addVote(anecdote.id))
              dispatch(
                setNotification(
                  `You voted ${anecdote.content}`,
                  5,
                ),
              )
            }}
          />
        ))}
      </div>
    </>
  )
}

export default AnecdoteList
