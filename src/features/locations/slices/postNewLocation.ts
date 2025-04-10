import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { postLocation } from '../services/location.service'
import { LocationTypes } from '../types/LocationTypes'
import { setNewLocation } from './location.slice'

export const postNewLocation = (newLocation: LocationTypes) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postLocation(newLocation)
      dispatch(setNewLocation(response))
      return response
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
