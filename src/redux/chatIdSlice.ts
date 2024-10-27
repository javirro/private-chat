import { createSlice } from '@reduxjs/toolkit'

const chatIdSlice = createSlice({
  name: 'chatId',
  initialState: window.localStorage.getItem('chatId') || '',
  reducers: {
    updateChatId: (state, action) => {
      console.log("Previous state chatId", state)
      return action.payload},
  },
})

// export default store
const { actions, reducer } = chatIdSlice
export const { updateChatId } = actions
export default reducer
