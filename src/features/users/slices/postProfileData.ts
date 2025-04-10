import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { sendProfileData } from '../services/profile.service'
import { UserProfile } from '../types/UserProfile'
import { setProfile } from './profile.slice'
import { setUserProfile } from './user.slice'

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
