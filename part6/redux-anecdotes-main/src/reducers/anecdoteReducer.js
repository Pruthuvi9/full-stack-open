import { createSlice, current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
    // votes: Math.ceil(10 * Math.random()),
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteTo(state, action) {
      // console.log(current(state)
      const id = action.payload
      const anecdoteToChange = state.find(
        (a) => a.id === id,
      )
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((a) =>
        a.id === changedAnecdote.id ? changedAnecdote : a,
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

const { setAnecdotes, createAnecdote, voteTo } =
  anecdoteSlice.actions

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    let newAnecdote =
      await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async (dispatch) => {
    let anecdoteToVote = await anecdoteService.getOne(id)

    const changedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    }

    await anecdoteService.vote(id, changedAnecdote.votes)
    dispatch(voteTo(id))
  }
}

// export const { voteTo } = anecdoteSlice.actions
export default anecdoteSlice.reducer
