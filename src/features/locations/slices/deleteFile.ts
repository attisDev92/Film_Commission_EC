import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { destroyLocationFile } from '../services/location.service'
import { updateLocation } from './location.slice'

export const deleteFile = (locationId: string, fileId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyLocationFile(fileId, locationId)
      const updatedLocation = response.data
      dispatch(updateLocation(updatedLocation))
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
