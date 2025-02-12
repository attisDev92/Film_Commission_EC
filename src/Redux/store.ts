import { configureStore } from '@reduxjs/toolkit'
import language from './languageReducer'
import user from './userReducer'
import { CompanyServiceType, LanguageState, User, UserProfile } from '../types'
import { thunk } from 'redux-thunk'
import { NotificationState } from './notificationReducer'
import notification from './notificationReducer'
import userProfile from './profileReducer'
import companies from './companiesReducer'

export interface GlobalState {
  user: User
  language: LanguageState
  notification: NotificationState
  userProfile: UserProfile
  companies: CompanyServiceType[]
}

const store = configureStore({
  reducer: {
    user,
    userProfile,
    language,
    companies,
    notification,
  },
  middleware: (getDefaultMddleware) => getDefaultMddleware().concat(thunk),
})

export type RooteState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
