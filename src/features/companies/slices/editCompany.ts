import { AppDispatch } from '../../../app/store/store'
import { setNotification } from '../../../app/store/slices/setNotification'
import { putCompany } from '../services/company.service'
import { CompanyServiceType } from '../types/CompanyServiceType'
import { updateCompany } from './companies.slice'

export const editCompany = (companyEdited: CompanyServiceType) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await putCompany(companyEdited)
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
