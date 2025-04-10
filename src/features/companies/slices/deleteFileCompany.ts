import { AppDispatch } from '../../../app/store/store'
import { setNotification } from '../../../app/store/slices/setNotification'
import { destroyCompanyFile } from '../services/company.service'
import { updateCompany } from './companies.slice'

export const deleteFileCompany = (fileId: string, companyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyCompanyFile(fileId, companyId)
      dispatch(updateCompany(response))
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
