import { getLocations } from '../services/location.service'
import { AppDispatch } from '../../../app/store/store'
import { setLocations } from './location.slice'
import { setNotification } from '../../../app/store/slices/setNotification'

export const fetchAllLocations = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getLocations()
      dispatch(setLocations(response))
    } catch (error: unknown) {
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
