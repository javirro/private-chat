import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import languageReducer from './languageSlice'
import { changeLanguage } from './languageSlice'
import chatIdReducer from './chatIdSlice'
import { updateChatId } from './chatIdSlice'


const localStorageMiddleware = createListenerMiddleware()

localStorageMiddleware.startListening({
  matcher: isAnyOf(changeLanguage),
  effect: (action) => {
    if (action.type === changeLanguage.type) {
      localStorage.setItem('language', action.payload)
    } else if (action.type === updateChatId.type) {
      localStorage.setItem('chatId', action.payload)
    }
  },
})

const store = configureStore({
  reducer: {
    language: languageReducer,
    chatId: chatIdReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
})

export default store
