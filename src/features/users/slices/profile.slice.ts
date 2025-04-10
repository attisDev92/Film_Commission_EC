import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { UserProfile } from '../types/UserProfile'

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

export default userProfileSlice.reducer
