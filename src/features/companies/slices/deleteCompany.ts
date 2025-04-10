import { AppDispatch } from '../../../app/store/store'
import { setNotification } from '../../../app/store/slices/setNotification'
import { destroyCompany } from '../services/company.service'
import { removeCompany } from './companies.slice'

export const deleteCompany = (companyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyCompany(companyId)
      if (response.success) {
        dispatch(removeCompany(companyId))
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
