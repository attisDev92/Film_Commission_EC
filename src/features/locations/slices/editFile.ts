import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { putLocationFile } from '../services/location.service'
import { updateLocation } from './location.slice'

export const editFile = (formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await putLocationFile(formData)
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
      }
    }
  }
}
