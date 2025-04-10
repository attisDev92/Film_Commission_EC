import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { postProject } from '../services/projects.service'
import { AudiovisualProject } from '../types/AudiovisualProject'
import { setNewProject } from './audiovisualProject.sllice'

export const createProject = (newProject: AudiovisualProject) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postProject(newProject)
      dispatch(setNewProject(response))
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
