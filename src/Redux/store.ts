import { configureStore } from '@reduxjs/toolkit'
import language from './languageReducer'
import user from './userReducer'
import { LanguageState, User, UserProfile } from '../types'
import { thunk } from 'redux-thunk'
import { NotificationState } from './notificationReducer'
import notification from './notificationReducer'
import userProfile from './profileReducer'

export interface GlobalState {
  user: User
  language: LanguageState
  notification: NotificationState
  userProfile: UserProfile
}

const store = configureStore({
  reducer: {
    user,
    userProfile,
    language,
    notification,
  },
  middleware: (getDefaultMddleware) => getDefaultMddleware().concat(thunk),
})

export type RooteState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
