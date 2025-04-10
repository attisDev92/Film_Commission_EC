import { configureStore } from '@reduxjs/toolkit'
import language from '../store/slices/language.slice'
import user from '../../features/users/slices/user.slice'
import { LocationTypes } from '../../features/locations/types/LocationTypes'
import { LanguageState } from '../../common/types/LanguageState'
import { UserProfile } from '../../features/users/types/UserProfile'
import { User } from '../../features/users/types/User'
import { AudiovisualProject } from '../../features/projects/types/AudiovisualProject'
import { CompanyServiceType } from '../../features/companies/types/CompanyServiceType'
import { thunk } from 'redux-thunk'
import { NotificationState } from './slices/notiffication.slice'
import notification from './slices/notiffication.slice'
import userProfile from '../../features/users/slices/profile.slice'
import companies from '../../features/companies/slices/companies.slice'
import audiovisualProjects from '../../features/projects/slices/audiovisualProject.sllice'
import locations from '../../features/locations/slices/location.slice'

export interface GlobalState {
  user: User
  language: LanguageState
  notification: NotificationState
  userProfile: UserProfile
  companies: CompanyServiceType[]
  audiovisualProjects: AudiovisualProject[]
  locations: LocationTypes[]
}

const store = configureStore({
  reducer: {
    user,
    userProfile,
    language,
    companies,
    notification,
    audiovisualProjects,
    locations,
  },
  middleware: (getDefaultMddleware) => getDefaultMddleware().concat(thunk),
})

export type RooteState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
