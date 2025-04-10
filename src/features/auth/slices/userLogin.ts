import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { loginUser } from '../services/auth.service'
import { UserCredentials } from '../types/UserCredentials'
import { User } from '../../users/types/User'
import { getUserProfile } from '../../users/slices/getUserProfile'
import { setUser } from '../../users/slices/user.slice'

export const userLogin = (credentials: UserCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = (await loginUser(credentials)) as User
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
      throw error
    }
  }
}
