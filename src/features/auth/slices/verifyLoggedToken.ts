import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { setUserToken, authenticateToken } from '../services/auth.service'
import { User } from '../../users/types/User'
import { getUserProfile } from '../../users/slices/getUserProfile'
import { setUser } from '../../users/slices/user.slice'

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
