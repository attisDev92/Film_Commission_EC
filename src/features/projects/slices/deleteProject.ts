import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { destroyProject } from '../services/projects.service'
import { removeProject } from './audiovisualProject.sllice'

export const deleteProject = (projectId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyProject(projectId)
      if (response.success) {
        dispatch(removeProject(projectId))
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
