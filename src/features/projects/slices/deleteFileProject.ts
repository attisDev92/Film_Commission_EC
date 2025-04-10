import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { deleteProjectFiles } from '../services/projects.service'
import { updateProject } from './audiovisualProject.sllice'

export const deleteFileProject = (fileId: string, projectId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await deleteProjectFiles(fileId, projectId)
      dispatch(updateProject(response))
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
