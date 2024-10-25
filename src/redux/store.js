import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import languageReducer from './languageSlice'
import { changeLanguage } from './languageSlice'

const localStorageMiddleware = createListenerMiddleware()

localStorageMiddleware.startListening({
  matcher: isAnyOf(changeLanguage),
  effect: (action, _) => {
    if (action.type === changeLanguage.type) {
      localStorage.setItem('language', action.payload)
    }
  },
})

const store = configureStore({
  reducer: {
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
})

export default store
