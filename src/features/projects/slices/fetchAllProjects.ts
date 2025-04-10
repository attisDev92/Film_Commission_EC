import { setNotification } from '../../../app/store/slices/setNotification'
import { AppDispatch } from '../../../app/store/store'
import { getProjects } from '../services/projects.service'
import { setProjects } from './audiovisualProject.sllice'

export const fetchAllProjects = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getProjects()
      dispatch(setProjects(response))
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
