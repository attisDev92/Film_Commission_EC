import { configureStore } from '@reduxjs/toolkit'
import language from './languageReducer'
import user from './userReducer'
import {
  AudiovisualProject,
  CompanyServiceType,
  LanguageState,
  User,
  UserProfile,
} from '../types'
import { thunk } from 'redux-thunk'
import { NotificationState } from './notificationReducer'
import notification from './notificationReducer'
import userProfile from './profileReducer'
import companies from './companiesReducer'
import audiovisualProjects from './audiovisualProjectReducer'

export interface GlobalState {
  user: User
  language: LanguageState
  notification: NotificationState
  userProfile: UserProfile
  companies: CompanyServiceType[]
  audiovisualProjects: AudiovisualProject[]
}

const store = configureStore({
  reducer: {
    user,
    userProfile,
    language,
    companies,
    notification,
    audiovisualProjects,
  },
  middleware: (getDefaultMddleware) => getDefaultMddleware().concat(thunk),
})

export type RooteState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
