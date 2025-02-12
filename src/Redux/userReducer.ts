import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { User, UserCredentials } from '../types'
import {
  authenticateToken,
  loginUser,
  setUserToken,
} from '../services/UserServices'
import { setNotification } from './notificationReducer'
import { AppDispatch } from './store'
import { getUserProfile } from './profileReducer'

const initialState: User = {
  username: null,
  role: null,
  userToken: null,
  email: '',
  profile: '',
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
    setUserProfile: (state, action: PayloadAction<string>) => {
      window.localStorage.removeItem('FilmCommisionUser')
      state.profile = action.payload
      window.localStorage.setItem('FilmCommisionUser', JSON.stringify(state))
    },
  },
})

export const { setUser, setLogout, setUserProfile } = userSlice.actions

export const userLogin = (credentials: UserCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await loginUser(credentials)
      window.localStorage.setItem('FilmCommisionUser', JSON.stringify(response))
      dispatch(setUser(response))
      if (response.profile && response.userToken) {
        dispatch(getUserProfile())
      }
      return response
    } catch (error: unknown) {
      console.error(error)
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

export const verifyLoggedToken = (user: User) => {
  return async (dispatch: AppDispatch) => {
    try {
      setUserToken(user.userToken)
      const response = await authenticateToken()
      if (response.username) {
        dispatch(setUser(user))
        if (user.profile && user.userToken) {
          dispatch(getUserProfile())
        }
      } else {
        // @ts-expect-error dispatch expect payload action but setLogout dont need arguments
        dispatch(setLogout())
      }
    } catch (error) {
      console.error(error)
      // @ts-expect-error dispatch expect payload action but setLogout dont need arguments
      dispatch(setLogout())
      dispatch(
        setNotification({
          style: 'error',
          text: `Error: Intento de autenticación fallido, credenciales invalidas`,
        }),
      )
    }
  }
}

export default userSlice.reducer
