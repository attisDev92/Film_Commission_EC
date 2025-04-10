import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { postProjectFiles } from '../services/projects.service'
import { updateProject } from './audiovisualProject.sllice'

export const editFile = (formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postProjectFiles(formData)
      dispatch(updateProject(response))
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
