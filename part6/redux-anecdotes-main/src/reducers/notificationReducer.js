import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    resetNotification() {
      return null
    },
  },
})

const { addNotification, resetNotification } =
  notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
