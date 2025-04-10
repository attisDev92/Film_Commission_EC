import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { getProfile } from '../services/profile.service'
import { setProfile } from './profile.slice'

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
