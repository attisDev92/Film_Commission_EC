import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { UserProfile } from '../types'
import { AppDispatch } from './store'
import { getProfile, sendProfileData } from '../services/ProfileServices'
import { setNotification } from './notificationReducer'
import { setUserProfile } from './userReducer'

const initialState: UserProfile | object = {}

const userProfileSlice: Slice<UserProfile | object> = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfile: (_state, action: PayloadAction<UserProfile>) => {
      return action.payload
    },
    unsetProfile: () => {
      return {}
    },
  },
})

export const { setProfile, unsetProfile } = userProfileSlice.actions

export const postProfileData = (profileData: UserProfile) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await sendProfileData(profileData)
      dispatch(setProfile(response))
      dispatch(setUserProfile(response.id))
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export const getUserProfile = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getProfile()
      dispatch(setProfile(response))
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export default userProfileSlice.reducer
