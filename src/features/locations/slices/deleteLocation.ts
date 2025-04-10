import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { destroyLocation } from '../services/location.service'
import { removeLocation } from './location.slice'

export const deleteLocation = (locationId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyLocation(locationId)
      if (response.success) {
        dispatch(removeLocation(locationId))
      }
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
