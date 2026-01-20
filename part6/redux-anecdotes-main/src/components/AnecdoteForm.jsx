import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addNewAnecdote = async (event) => {
    event.preventDefault()

    let content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(appendAnecdote(content))
    dispatch(
      setNotification(
        `Added new anecdote: "${content}"`,
        5,
      ),
    )
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
