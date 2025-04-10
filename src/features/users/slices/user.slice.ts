import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { User } from '../types/User'

const initialState: User = {
  username: null,
  role: null,
  userToken: null,
  email: '',
  profile: '',
  id: '',
}

const userSlice: Slice<User> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => {
      return action.payload
    },
    setLogout: () => {
      window.localStorage.removeItem('FilmCommisionUser')
      return initialState
    },
    setUserProfile: (state: User, action: PayloadAction<string>) => {
      state.profile = action.payload
    },
  },
})

export const { setUser, setLogout, setUserProfile } = userSlice.actions

export default userSlice.reducer
