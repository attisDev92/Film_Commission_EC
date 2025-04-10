import { AppDispatch } from '../../../app/store/store'
import { setNotification } from '../../../app/store/slices/setNotification'
import { updateCompany } from './companies.slice'
import { postCompanyFile } from '../services/company.service'

export const editFile = (formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postCompanyFile(formData)
      dispatch(updateCompany(response))
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
