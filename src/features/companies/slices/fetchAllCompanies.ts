import { AppDispatch } from '../../../app/store/store'
import { setNotification } from '../../../app/store/slices/setNotification'
import { getCompanies } from '../services/company.service'
import { setCompanies } from './companies.slice'

export const fetchAllCompanies = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getCompanies()
      dispatch(setCompanies(response))
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
