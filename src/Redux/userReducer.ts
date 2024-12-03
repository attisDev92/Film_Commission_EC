import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { User, UserCredentials } from '../types'
import { authenticateToken, loginUser } from '../services/UserServices'
import { setNotification } from './notificationReducer'
import { AppDispatch } from './store'

const initialState: User = {
  username: null,
  role: null,
  userToken: null,
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
  },
})

export const { setUser, setLogout } = userSlice.actions

export const userLogin = (credentials: UserCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await loginUser(credentials)
      window.localStorage.setItem('FilmCommisionUser', JSON.stringify(response))
      dispatch(setUser(response))
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
      await authenticateToken(user.userToken)
      dispatch(setUser(user))
    } catch (error) {
      console.error(error)
      dispatch(
        setNotification({
          style: 'error',
          text: `Error: Intento de autenticación fallido, credenciales invalidas`,
        }),
      )
      dispatch(setLogout)
    }
  }
}

export default userSlice.reducer
