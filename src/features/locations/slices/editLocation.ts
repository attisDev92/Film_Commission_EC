import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { putLocation } from '../services/location.service'
import { LocationTypes } from '../types/LocationTypes'
import { updateLocation } from './location.slice'

export const editLocation = (locationEdited: LocationTypes) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await putLocation(locationEdited)
      dispatch(updateLocation(response))
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
