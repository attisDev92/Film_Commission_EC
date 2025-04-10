import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { putProject } from '../services/projects.service'
import { AudiovisualProject } from '../types/AudiovisualProject'
import { updateProject } from './audiovisualProject.sllice'
export const editProject = (projectEdited: AudiovisualProject) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await putProject(projectEdited)
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
