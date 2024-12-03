import { configureStore } from '@reduxjs/toolkit'
import language from './languageReducer'
import user from './userReducer'
import { LanguageState, User } from '../types'
import { thunk } from 'redux-thunk'
import { NotificationState } from './notificationReducer'
import notification from './notificationReducer'

export interface GlobalState {
  user: User
  language: LanguageState
  notification: NotificationState
}

const store = configureStore({
  reducer: {
    user,
    language,
    notification,
  },
  middleware: (getDefaultMddleware) => getDefaultMddleware().concat(thunk),
})

export type RooteState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
