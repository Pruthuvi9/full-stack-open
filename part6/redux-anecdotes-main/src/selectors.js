import { createSelector } from '@reduxjs/toolkit'

const selectAnecdotes = (state) => state.anecdotes
const selectFilter = (state) => state.filter

export const selectVisibleAnecdotes = createSelector(
  [selectAnecdotes, selectFilter],
  (anecdotes, filter) => {
    const list =
      filter === ''
        ? anecdotes
        : anecdotes.filter((a) =>
            a.content.includes(filter),
          )

    return [...list].sort((a, b) => b.votes - a.votes)
  },
)
