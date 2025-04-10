import { AppDispatch } from '../../../app/store/store'
import { setNotification } from '../../../app/store/slices/setNotification'
import { setNewCompany } from './companies.slice'
import { postCompany as postCompanyService } from '../services/company.service'
import { CompanyServiceType } from '../types/CompanyServiceType'

export const postCompany = (newCompany: CompanyServiceType) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postCompanyService(newCompany)
      dispatch(setNewCompany(response))
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
